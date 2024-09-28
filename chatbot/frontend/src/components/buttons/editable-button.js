import { useContext, useState } from "react"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function EditableButton({ name, index }) {
  const [editableName, setEditableName] = useState(name)
  const [previousName, setPreviousName] = useState(name)
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const onClick = (element) => {
    element.target.removeAttribute("readOnly")
  }

  const onChange = (e) => {
    setEditableName(e.target.value)
    const newTopics = [...dashboardContext.premadePrompts]
    newTopics[index].prompt = e.target.value
    dashboardContext.setPremadePrompts(newTopics)
  }

  const onFocus = (e) => {
    setPreviousName(editableName)
  }

  const outOfFocus = async () => {
    if (!dashboardContext.premadePrompts[index].id) {
      const response = await fetch("http://localhost:3000/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
          "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
        },
        body: JSON.stringify({
          prompt: editableName,
        }),
        credentials: "include",
      })
      if (response.status !== 201) {
        throw new Error("Failed to save newly created prompt!")
      }
      const { prompt } = await response.json()
      const newPrompts = [...dashboardContext.premadePrompts]
      newPrompts[index] = prompt
      dashboardContext.setPremadePrompts(newPrompts)
    } else {
      if (editableName !== previousName) {
        const response = await fetch(
          "http://localhost:3000/prompt/" +
            dashboardContext.premadePrompts[index].id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + appContext.cookie.get("userToken"),
              "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              prompt: editableName,
            }),
            credentials: "include",
          }
        )

        if (response.status !== 200) {
          throw new Error("Failed to update the prompt!")
        }

        const newPrompts = [...dashboardContext.premadePrompts]
        newPrompts[index].text = editableName
        dashboardContext.setPremadePrompts(newPrompts)
      }
    }
  }

  return (
    <div className="middle none font-sans text-inherit font-bold center bg-inherit transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-gradient-to-tr from-blue-600 to-blue-400 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize">
      <input
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={outOfFocus}
        className="block antialiased bg-inherit font-sans text-base leading-relaxed text-inherit font-medium capitalize"
        readOnly
        value={editableName}></input>
    </div>
  )
}
