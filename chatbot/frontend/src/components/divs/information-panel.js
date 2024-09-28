import { useContext } from "react"
import FunctionButton from "../buttons/function-button"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"
import InfoBlock from "./info-block"
import DeleteButton from "../buttons/delete-button"
import UploadBlock from "./upload-block"
import UploadButton from "../buttons/upload-button"

export default function InformationPanel() {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const addInfo = () => {
    const newData = [...dashboardContext.trainData, { title: "", text: "" }]
    dashboardContext.setTrainData(newData)
  }

  const deleteInfo = async (index) => {
    if (dashboardContext.trainData[index].id) {
      const response = await fetch(
        "http://localhost:3000/info/" + dashboardContext.trainData[index].id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + appContext.cookie.get("userToken"),
            "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
          },
          credentials: "include",
        }
      )

      if (response.status !== 200) {
        console.error("Error deleting info")
      }
    }
  }

  const handleFileChange = (event) => {
    const files = Object.values(event.target.files).filter(
      (value, index) => value !== index
    )
    dashboardContext.setSelectedFiles(files)
  }

  const deleteFile = () => {}

  const train = async () => {
    const response = await fetch("http://localhost:5000/model/train", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status !== 200) {
      throw new Error("Error training of the model!")
    }
  }

  return (
    <div className="z-0 flex flex-col items-end w-full h-full overflow-y-auto p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-inherit w-full lg:w-4/5 h-full p-4">
        <div className="flex flex-row justify-between items-center">
          <FunctionButton
            name={"Add Train Data"}
            symbol={"plus"}
            onClickModifier={addInfo}
          />
          <UploadButton onChange={handleFileChange} />
          <FunctionButton
            name={"Train Model"}
            symbol={"shapes"}
            onClickModifier={train}
          />
        </div>
        <div className="p-2">
          {dashboardContext.selectedFiles.map((data, index, key) => (
            <div className="flex p-2">
              <UploadBlock file={data} />
              <DeleteButton
                index={index}
                controlState={dashboardContext.selectedFiles}
                setControlState={dashboardContext.setSelectedFiles}
                onClickModifier={deleteFile}
              />
            </div>
          ))}
        </div>
        <div className="p-2">
          {dashboardContext.trainData.map((data, index, key) => (
            <div className="flex p-2">
              <InfoBlock
                title={data.title}
                text={data.text}
                index={index}
                key={key}
              />
              <DeleteButton
                index={index}
                controlState={dashboardContext.trainData}
                setControlState={dashboardContext.setTrainData}
                onClickModifier={deleteInfo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
