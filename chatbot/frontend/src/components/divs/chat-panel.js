import { useContext } from "react"
import MessagePanel from "./message-panel"
import PromptPanel from "./prompt-panel"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function ChatPanel() {
  const dashboardContext = useContext(DashboardContext)
  return (
    <div className="z-0 flex flex-col items-end w-full h-full p-6">
      <div
        className={`flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-inherit w-full lg:w-4/5 h-full p-4 ${
          !dashboardContext.navbarVisible ? "blur-[1px] lg:blur-0" : ""
        }`}>
        <MessagePanel />
        <PromptPanel />
      </div>
    </div>
  )
}
