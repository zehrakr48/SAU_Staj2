const { where } = require("sequelize")
const Prompt = require("../models/prompt")

exports.getPrompts = async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll()
    return res.status(200).json({
      message: "Prompts retrieved successfully",
      prompts: prompts,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while retrieving the prompts!",
    })
  }
}

exports.createPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body
    const newPrompt = await Prompt.create({ text: prompt })
    return res.status(201).json({
      message: "Prompt created successfully",
      prompt: newPrompt,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while creating the prompt!",
    })
  }
}

exports.updatePrompt = async (req, res, next) => {
  try {
    const { id } = req.params
    const { prompt } = req.body
    const updatedPrompt = await Prompt.update(
      { text: prompt },
      { where: { id: id } }
    )
    return res.status(200).json({
      message: "Prompt updated successfully",
      prompt: updatedPrompt,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while updating the prompt!",
    })
  }
}

exports.deletePrompt = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedPrompt = await Prompt.destroy({ where: { id: id } })
    return res.status(200).json({
      message: "Prompt deleted successfully",
      prompt: deletedPrompt,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while creating the prompt!",
    })
  }
}

exports.deletePrompts = async (req, res, next) => {
  try {
    const deletionResult = await Prompt.destroy({ where: {} })
    return res.status(200).json({
      message: "All prompts deleted successfully",
      result: deletionResult,
    })
  } catch (error) {
    return res.status(500).json({
      message: "There is an error occured while deleting the prompt!",
    })
  }
}
