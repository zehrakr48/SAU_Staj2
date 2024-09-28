import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../contexts/app-context"

const authWrap = (Component) => {
  return (props) => {
    const navigate = useNavigate()
    const appContext = useContext(AppContext)

    useEffect(() => {
      const userToken = appContext.cookie.get("userToken")
      if (userToken) {
        fetch("http://localhost:3000/account/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
          },
          credentials: "include",
        }).then((result) => {
          if (result.status !== 200) {
            console.error(result)
          }
        })
      }
      const token = appContext.cookie.get("sessionToken")
      if (!token) {
        navigate("/")
      }
    }, [navigate])

    return <Component {...props} />
  }
}

export default authWrap
