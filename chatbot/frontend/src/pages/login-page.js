import { useContext, useEffect } from "react"
import LoginCard from "../components/divs/login-card"
import { AppContext } from "../contexts/app-context"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const appContext = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (appContext.cookie.get("sessionToken")) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <div className="font-sans w-full">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-700 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-indigo-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <LoginCard />
        </div>
      </div>
    </div>
  )
}
