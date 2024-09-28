const { where } = require("sequelize")
const fs = require("fs")
const axios = require("axios")

const Info = require("../models/info")

exports.createInfo = async (req, res, next) => {
  try {
    const { title, text } = req.body
    const newInfo = await Info.create({ title: title, text: text })
    return res.status(201).json({
      message: "Title created successfully",
      info: newInfo,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while creating the title!",
    })
  }
}

exports.updateInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, text } = req.body
    const updatedInfo = await Info.update(
      { title: title, text: text },
      { where: { id: id } }
    )
    return res.status(200).json({
      message: "Info updated successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while updating the info!",
    })
  }
}

exports.getInfos = async (req, res, next) => {
  try {
    const data = await Info.findAll()
    return res.status(200).json({
      message: "Prompts retrieved successfully",
      infos: data,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while retrieving the prompts!",
    })
  }
}

exports.deleteInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedInfo = await Info.destroy({ where: { id: id } })
    return res.status(200).json({
      message: "Prompt deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while deleting the info!",
    })
  }
}

exports.extractPDF = async (req, res, next) => {
  try {
    const file = req.file

    const fileBuffer = fs.readFileSync(file.path)

    const response = await axios.post(
      "https://pdf-services.adobe.io/assets",
      {
        mediaType: "application/pdf",
      },
      {
        headers: {
          "X-API-Key": process.env.PDF_API_KEY,
          "Authorization": `Bearer ${process.env.PDF_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (response.status !== 200) {
      throw new Error("Couldn't handshake with api!")
    }

    const { uploadUri, assetID } = await response.data

    await axios.put(uploadUri, fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
      },
    })

    console.log("Successfully uploaded the file!")

    const jobResp = await axios.post(
      "https://pdf-services-ue1.adobe.io/operation/extractpdf",
      { assetID: assetID },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.PDF_API_KEY,
          "Authorization": `Bearer ${process.env.PDF_ACCESS_TOKEN}`,
        },
      }
    )

    if (jobResp.status !== 201) {
      console.log("Error creating job for file extraction")
    }
    const { location } = jobResp.headers
    console.log(location)
    let data
    while (true) {
      const jobStatusResp = await axios.get(location, {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.PDF_API_KEY,
          "Authorization": `Bearer ${process.env.PDF_ACCESS_TOKEN}`,
        },
      })
      const { status, content } = await jobStatusResp.data
      if (status === "done") {
        const contentResp = await axios.get(content.downloadUri)
        data = await contentResp.data
        break
      }
    }

    data.elements.forEach(async (element) => {
      if (element.Text) {
        const newInfo = await Info.create({ text: element.Text })
      }
    })

    return res.status(201).json({ message: "File successfully saved!" })
  } catch (error) {
    console.error(
      "Error extracting text:",
      error.response ? error.response.data : error.message
    )
    res.status(500).json({ error: "Failed to extract text from PDF" })
  }
}
