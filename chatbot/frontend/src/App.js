import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./pages/login-page"
import RegisterPage from "./pages/register-page"
import DashboardPage from "./pages/dashboard-page"

import AppProvider from "./contexts/app-context"
import DashboardProvider from "./contexts/dashboard-context"

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardProvider>
                <DashboardPage />
              </DashboardProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
