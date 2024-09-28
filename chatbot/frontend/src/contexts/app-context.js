import { createContext, useState, useRef } from "react"
import Cookies from "universal-cookie"

const AppContext = createContext()

export default function AppProvider({ children }) {
  const cookie = new Cookies({ path: "/" })

  const state = {
    cookie,
  }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export { AppContext }
