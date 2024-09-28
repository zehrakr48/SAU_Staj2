import React, { useContext, useState } from "react"

import FunctionButton from "../buttons/function-button"
import { AppContext } from "../../contexts/app-context"
import { DashboardContext } from "../../contexts/dashboard-context"
import RedirectButton from "../buttons/redirect-button"
import EditableButton from "../buttons/editable-button"

export default function Navbar({ showNavbar }) {
  const appContext = useContext(AppContext)
  const dashboardContext = useContext(DashboardContext)
  const [selectedMenu, setSelectedMenu] = useState("Dashboard")

  const changeMenu = (name) => {
    dashboardContext.setAdminPanelVisible(false)
    setSelectedMenu(name)
  }

  const loadConversation = async (name, index) => {
    dashboardContext.convIndex.current =
      dashboardContext.prevConversations[index].id
    const response = await fetch(
      "http://localhost:3000/conversation/" +
        dashboardContext.convIndex.current,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + appContext.cookie.get("userToken"),
        },
      }
    )
    if (response.status !== 200) {
      throw new Error("Error loading conversation")
    }
    const data = await response.json()
    dashboardContext.setCurrentConversation(data.conversation)
  }

  const createConversation = async (name) => {
    const conv = []
    dashboardContext.convIndex.current = -1
    dashboardContext.setCurrentConversation(conv)

    if (name !== "New Conversation") {
      conv.push({ text: name })
      dashboardContext.setCurrentConversation(conv)
      try {
        const response = await fetch("http://localhost:5000/model", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: name,
            conversationHistory: [],
          }),
        })
        if (response.status !== 200) {
          alert("Failed to get response from model!")
          throw new Error("Failed to get response from model!")
        }
        const data = await response.json()
        const newConv = [...conv, { text: data.reply }]
        dashboardContext.setCurrentConversation(newConv)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const logout = () => {
    appContext.cookie.remove("sessionToken", { path: "/" })
    appContext.setCurrentConversation([])
    appContext.cookie.remove("userToken", { path: "/" })
    appContext.cookie.remove("XSRF-TOKEN", { path: "/" })
    localStorage.clear()
  }

  const showAdminPanel = () => {
    dashboardContext.setAdminPanelVisible(!dashboardContext.adminPanelVisible)
    dashboardContext.setNavbarVisible(false)
    setSelectedMenu("Admin")
  }

  const outOfFocus = () => {
    dashboardContext.setNavbarVisible(false)
  }

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
    <div onBlur={outOfFocus} className="z-50">
      <aside
        className={`absolute top-14 bottom-2 lg:left-0 lg:opacity-100 lg:w-1/5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-r-xl duration-300 
          ${
            !dashboardContext.navbarVisible
              ? "left-0 w-full lg:w-1/5 "
              : "-left-full w-0 opacity-0"
          } `}>
        <div className="flex justify-start items-center gap-2 px-4 py-2">
          <span className="font-semibold uppercase text-xl text-white font-sans">
            EDS-AI DASHBOARD
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <div className="m-4">
            <div
              className={`border-b border-white/20 ${
                selectedMenu === "Dashboard" ? "hidden" : "flex"
              }`}>
              <FunctionButton
                paths={[
                  "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z",
                  "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z",
                ]}
                name={"Dashboard"}
                onClickModifier={changeMenu}
              />
            </div>
            <ul
              className={`mb-2 ${
                selectedMenu === "Dashboard" ? "flex" : "hidden"
              } flex-col gap-1`}>
              <li
                className={`${
                  appContext.cookie.get("userToken") ? "" : "hidden"
                }`}>
                <FunctionButton
                  paths={[
                    "M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z",
                  ]}
                  name={"Conversations"}
                  onClickModifier={changeMenu}
                />
              </li>
              <li>
                <FunctionButton
                  paths={[
                    "M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z",
                  ]}
                  name={"Pre-Made Prompts"}
                  onClickModifier={changeMenu}
                />
              </li>
              <li
                className={`${
                  appContext.cookie.get("XSRF-TOKEN") ? "" : "hidden"
                }`}>
                <FunctionButton
                  paths={[
                    "M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
                  ]}
                  name={"Administration"}
                  onClickModifier={showAdminPanel}
                />
              </li>
            </ul>
            <ul
              className={`mb-2 ${
                selectedMenu === "Conversations" ? "flex" : "hidden"
              } flex-col gap-1 max-h-80 overflow-y-auto`}>
              {dashboardContext.prevConversations.map((conv, key) => (
                <li>
                  <FunctionButton
                    name={"Prev Conv " + key}
                    onClickModifier={loadConversation}
                    index={key}
                    key={key}
                  />
                </li>
              ))}
            </ul>

            <ul
              className={`mb-2 ${
                selectedMenu === "Pre-Made Prompts" ? "flex" : "hidden"
              } flex-col gap-1 max-h-80 overflow-y-auto`}>
              {dashboardContext.premadePrompts.map((promptObj, key) => (
                <li>
                  <FunctionButton
                    name={promptObj.text}
                    onClickModifier={createConversation}
                    key={key}
                  />
                </li>
              ))}
            </ul>

            <ul
              className={`mb-2 flex flex-col gap-1 ${
                selectedMenu === "Admin" ? "flex" : "hidden"
              }`}>
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

            <ul className="my-2 flex flex-col gap-1 border-t border-white/20">
              <li>
                <FunctionButton
                  name={"New Conversation"}
                  onClickModifier={createConversation}
                />
              </li>
            </ul>
          </div>
          <div className="m-4">
            <RedirectButton
              text={"Log Out"}
              redirectPath={"/"}
              onClickModifier={logout}
              className={
                "middle none font-sans font-bold center bg-inherit transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-gradient-to-tr from-blue-600 to-blue-400 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
              }
            />
          </div>
        </div>
      </aside>
    </div>
  )
}
