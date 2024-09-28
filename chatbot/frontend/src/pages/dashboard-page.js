import React, { useContext, useEffect } from "react"

import ChatPanel from "../components/divs/chat-panel"
import Headline from "../components/divs/dashboard-headline"
import Navbar from "../components/divs/dashboard-navbar"
import { AppContext } from "../contexts/app-context"
import { DashboardContext } from "../contexts/dashboard-context"
import authWrap from "./auth-wrap"
import AdminPanel from "../components/divs/admin-panel"
import InformationPanel from "../components/divs/information-panel"

function DashboardPage() {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)

  const showNavbar = () => {
    dashboardContext.setNavbarVisible(!dashboardContext.navbarVisible)
  }

  useEffect(() => {
    fetch("http://localhost:3000/prompt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const data = await response.json()
      dashboardContext.setPremadePrompts(data.prompts)
    })

    if (
      appContext.cookie.get("userToken") &&
      appContext.cookie.get("XSRF-TOKEN")
    ) {
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

      fetch("http://localhost:3000/account/conversation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
        },
      }).then(async (response) => {
        const data = await response.json()
        dashboardContext.setPrevConversations(data.conversations)
      })
    } else {
      const data = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const array = localStorage.getItem(key).split(";")
        array.forEach((element) => {
          data.push({ text: element })
        })
      }
      dashboardContext.setCurrentConversation(data)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen w-screen bg-gray-800">
      <Headline showNavbar={showNavbar} />
      <div className="flex justify-between items-center w-full h-full overflow-hidden">
        <Navbar showNavbar={showNavbar} />
        {dashboardContext.adminPanelVisible ? (
          <InformationPanel />
        ) : (
          <ChatPanel />
        )}
      </div>
    </div>
  )
}

export default authWrap(DashboardPage)
