import { createContext, useState, useRef } from "react"

const DashboardContext = createContext()

export default function DashboardProvider({ children }) {
  const [currentConversation, setCurrentConversation] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [prevConversations, setPrevConversations] = useState([])
  const [premadePrompts, setPremadePrompts] = useState([])
  const [trainData, setTrainData] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [adminPanelVisible, setAdminPanelVisible] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(false)
  const convIndex = useRef(-1)

  const state = {
    currentConversation,
    setCurrentConversation,
    currentPrompt,
    setCurrentPrompt,
    prevConversations,
    setPrevConversations,
    premadePrompts,
    setPremadePrompts,
    trainData,
    setTrainData,
    selectedFiles,
    setSelectedFiles,
    adminPanelVisible,
    setAdminPanelVisible,
    navbarVisible,
    setNavbarVisible,
    convIndex,
  }

  return (
    <DashboardContext.Provider value={state}>
      {children}
    </DashboardContext.Provider>
  )
}

export { DashboardContext }
