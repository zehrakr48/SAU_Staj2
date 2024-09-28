import { useContext, useRef, useState } from "react"

import RequestButton from "../buttons/request-button"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"

export default function PromptPanel() {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)
  const [buttonActive, setButtonActive] = useState(true)
  const isReplied = useRef(true)

  function setPrompt(e) {
    const searchTerm = e.target.value
    dashboardContext.setCurrentPrompt(searchTerm)
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      sendPrompt()
    }
  }

  const sendPrompt = async () => {
    if (isReplied.current && dashboardContext.currentPrompt !== "") {
      isReplied.current = false
      setButtonActive(false)
      const convHistory = [...dashboardContext.currentConversation]
      const newCurrentConversation = [
        ...dashboardContext.currentConversation,
        { text: dashboardContext.currentPrompt },
      ]
      dashboardContext.setCurrentConversation(newCurrentConversation)
      dashboardContext.setCurrentPrompt("")

      try {
        if (
          appContext.cookie.get("userToken") &&
          dashboardContext.convIndex.current === -1
        ) {
          const result = await fetch("http://localhost:3000/conversation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + appContext.cookie.get("userToken"),
            },
            body: JSON.stringify({
              name: "Conversation " + dashboardContext.prevConversations.length,
            }),
          })
          if (result.status !== 201) {
            throw new Error("Failed to save newly created conversation")
          }
          const data = await result.json()
          dashboardContext.convIndex.current = data.conversation.id
          const newConvs = [
            ...dashboardContext.prevConversations,
            data.conversation,
          ]
          dashboardContext.setPrevConversations(newConvs)
        }

        const response = await fetch("http://localhost:5000/model", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              newCurrentConversation[newCurrentConversation.length - 1].text,
            conversationHistory: convHistory,
          }),
        })
        if (response.status !== 200) {
          isReplied.current = true
          setButtonActive(true)
          throw new Error("Failed to receive model response!")
        }
        const data = await response.json()
        const newConv = [...newCurrentConversation, { text: data.reply }]
        dashboardContext.setCurrentConversation(newConv)
        isReplied.current = true
        setButtonActive(true)
        if (appContext.cookie.get("userToken")) {
          const updateResp = await fetch(
            "http://localhost:3000/conversation/" +
              dashboardContext.convIndex.current,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + appContext.cookie.get("userToken"),
              },
              body: JSON.stringify({
                messages: newConv,
              }),
            }
          )
          if (updateResp.status !== 200) {
            throw new Error("Failed to save new messages for conversation")
          }
          const updatedData = await updateResp.json()
          dashboardContext.setCurrentConversation(updatedData.newMessages)
        } else {
          const arrayString = newConv.map((message) => message.text).join(";")
          localStorage.setItem(dashboardContext.convIndex.current, arrayString)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-gray-700 w-full px-4 duration-500">
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            value={dashboardContext.currentPrompt}
            onKeyDown={onKeyDown}
            onChange={setPrompt}
            className="flex w-full bg-blue-100 border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <RequestButton
          name={"Send"}
          onClick={sendPrompt}
          isActive={buttonActive}
        />
      </div>
    </div>
  )
}
