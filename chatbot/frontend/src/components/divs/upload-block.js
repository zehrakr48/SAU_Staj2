import { useContext } from "react"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function UploadBlock({ file }) {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:3000/file/pdf", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
          "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
        },
        body: formData,
        credentials: "include",
      })

      if (response.status !== 201) {
        throw new Error("Error uploading file!")
      }

      fetch("http://localhost:3000/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
          "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
        },
        credentials: "include",
      }).then(async (response) => {
        const data = await response.json()
        dashboardContext.setTrainData(data.infos)
      })

      const updatedFiles = dashboardContext.selectedFiles.filter(
        (selectedFile) => selectedFile.name !== file.name
      )

      dashboardContext.setSelectedFiles(updatedFiles)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center p-3">
        <i class="fa-solid fa-file-pdf"></i>
        <p className="font-sans text-white">{file.name}</p>
      </div>
      <button
        onClick={uploadFile}
        className="flex items-center justify-center p-1 bg-gradient-to-tr from-blue-600 to-blue-400"
        type="button">
        <i class="fa-solid fa-cloud-arrow-up"></i>
      </button>
    </div>
  )
}
