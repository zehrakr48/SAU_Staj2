import { useContext, useState } from "react"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function InfoBlock({ title, text, index }) {
  const [titleField, setTitleField] = useState(title)
  const [textField, setTextField] = useState(text)
  const [prevInfo, setPrevInfo] = useState({ title: title, text: text })
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const onTitleChange = (e) => {
    setTitleField(e.target.value)
  }

  const onTextChange = (e) => {
    setTextField(e.target.value)
  }

  const onFocus = () => {
    setPrevInfo({ title: titleField, text: textField })
  }

  const outOfFocus = async () => {
    if (!dashboardContext.trainData[index].id) {
      const response = await fetch("http://localhost:3000/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
          "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
        },
        body: JSON.stringify({
          title: titleField,
          text: textField,
        }),
        credentials: "include",
      })
      if (response.status !== 201) {
        throw new Error("Failed to save newly created info!")
      }

      const { info } = await response.json()
      const newTrainData = [...dashboardContext.trainData]
      newTrainData[index] = info
      dashboardContext.setTrainData(newTrainData)
    } else {
      if (prevInfo.title !== titleField || prevInfo.text !== textField) {
        const response = await fetch(
          "http://localhost:3000/info/" + dashboardContext.trainData[index].id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + appContext.cookie.get("userToken"),
              "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              title: titleField,
              text: textField,
            }),
            credentials: "include",
          }
        )

        if (response.status !== 200) {
          throw new Error("Failed to update the info!")
        }

        const newTrainData = [...dashboardContext.trainData]
        newTrainData[index].title = titleField
        newTrainData[index].text = textField
        dashboardContext.setTrainData(newTrainData)
      }
    }
  }

  return (
    <div
      className="flex flex-col w-full
       rounded hover:border-2 border-white/20"
      onFocus={onFocus}
      onBlur={outOfFocus}>
      {(titleField === "" || titleField) && (
        <textarea
          className="font-sans capitalize text-white bg-inherit border-b border-white/20"
          placeholder="Data Title"
          onChange={onTitleChange}
          value={titleField}></textarea>
      )}
      <textarea
        type="text"
        rows={"5"}
        placeholder="Example Data"
        className="font-sans capitalize text-white bg-inherit"
        onChange={onTextChange}
        value={textField}></textarea>
    </div>
  )
}
