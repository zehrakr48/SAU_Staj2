import { useContext } from "react"

import Title from "../title"
import EditableButton from "../buttons/editable-button"
import FunctionButton from "../buttons/function-button"

import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function AdminPanel() {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const addPrompt = async () => {
    const newPrompts = [...dashboardContext.premadePrompts, { text: "" }]
    dashboardContext.setPremadePrompts(newPrompts)
  }

  const deleteAllPrompts = async () => {
    const response = await fetch("http://localhost:3000/prompt", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + appContext.cookie.get("userToken"),
        "X-XSRF-Token": appContext.cookie.get("XSRF-TOKEN"),
      },
      credentials: "include",
    })

    if (response.status !== 200) {
      throw new Error("Error deleting prompts")
    }

    dashboardContext.setPremadePrompts([])
  }

  return (
    <div className="z-40 p-4 h-full">
      <aside
        className={`z-20 fixed top-14 bottom-20 lg:bottom-2 right-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-l-xl transition-transform duration-300 ${
          !appContext.adminPanelVisible
            ? "translate-x-full min-w-0"
            : "translate-x-0 min-w-72 "
        } `}>
        <div className="relative flex items-center justify-center border-b border-white/20">
          <Title text={"ADMIN PANEL"} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="m-4">
            <ul className="mb-2 flex flex-col gap-1">
              {dashboardContext.premadePrompts.map((promptObj, key) => (
                <li>
                  <EditableButton name={promptObj.text} index={key} />
                </li>
              ))}
              <div className="mt-2 border-t border-white/20">
                <li>
                  <FunctionButton
                    name={"Add Prompt"}
                    onClickModifier={addPrompt}
                  />
                </li>
                <li>
                  <FunctionButton
                    name={"Delete All Prompts"}
                    onClickModifier={deleteAllPrompts}
                  />
                </li>
              </div>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}
