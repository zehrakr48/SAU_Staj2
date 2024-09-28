import { useContext } from "react"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function MessagePanel() {
  const dashboardContext = useContext(DashboardContext)

  const renderMessageContent = (message) => {
    // Check if the message is a table (you can customize this check)
    const isTable = message.text.includes("|")

    if (isTable) {
      const rows = message.text
        .trim()
        .split("\n")
        .map((row) => row.split("|").map((cell) => cell.trim()))

      return (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border border-gray-300">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-2 py-1">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return <div>{message.text}</div>
    }
  }

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2 overflow-y-auto">
          {dashboardContext.currentConversation &&
            dashboardContext.currentConversation.map((message, key) => (
              <div key={key} className="col-start-1 col-end-12 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r ${
                      key % 2 === 0
                        ? "from-blue-700 to-gray-300"
                        : "from-gray-300 to-blue-700"
                    } shadow-md shadow-blue-500/20 flex-shrink-0`}>
                    <div className="text-violet-950">
                      {key % 2 === 0 ? "You" : "AI"}
                    </div>
                  </div>
                  <div
                    className={`relative ml-3 text-sm ${
                      key % 2 === 0 ? "bg-gray-300" : "bg-blue-300"
                    } py-2 px-4 shadow rounded-xl`}>
                    {renderMessageContent(message)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
