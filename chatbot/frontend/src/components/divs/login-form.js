import { Link } from "react-router-dom"
import React, { useState } from "react"

import RedirectButton from "../buttons/redirect-button"
import InputField from "../input-field"
import Label from "../label"
import LoginOptions from "../login-options"

export default function LoginForm() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  function setEmailInput(e) {
    const searchTerm = e.target.value
    setEmail(searchTerm)
  }

  function setPasswordInput(e) {
    const searchTerm = e.target.value
    setPassword(searchTerm)
  }

  const loginAction = async () => {
    const response = await fetch("http://localhost:3000/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    })
    if (response.status !== 200) {
      alert("Invalid email or password")
      throw Error("Invalid email or password")
    }
    const { userRole } = await response.json()
  }

  const requestGuest = async () => {
    const response = await fetch("http://localhost:3000/account/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    if (response.status !== 200) {
      alert("New guest is not allowed!")
      throw Error("New guest is not allowed!")
    }
  }

  return (
    <div className="mt-10">
      <div>
        <InputField
          type={"email"}
          value={email}
          onChange={setEmailInput}
          placeholder={"Email"}
        />
      </div>

      <div className="mt-7">
        <InputField
          type={"password"}
          value={password}
          onChange={setPasswordInput}
          placeholder={"Password"}
        />
      </div>

      <LoginOptions />

      <div className="mt-7">
        <RedirectButton
          text={"Giriş Yap"}
          redirectPath={"/dashboard"}
          onClickModifier={loginAction}
          className={
            "bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          }
        />
      </div>

      <div className="mt-7">
        <RedirectButton
          text={"Misafir olarak giriş yap"}
          redirectPath={"/dashboard"}
          onClickModifier={requestGuest}
          className={
            "bg-blue-300 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          }
        />
      </div>

      <div className="flex mt-7 items-center text-center">
        <div className="border-gray-300 border-1 w-full rounded-md"></div>
        <Label
          text={"ile bağlan"}
          className={
            "block mt-3 text-sm text-sky-700 text-center font-semibold"
          }
        />
        <div className="border-gray-300 border-1 w-full rounded-md"></div>
      </div>

      <div className="flex mt-7 justify-center w-full">
        <RedirectButton
          text={"Facebook"}
          className={
            "mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          }
        />

        <RedirectButton
          text={"Google"}
          className={
            "bg-indigo-700 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          }
        />
      </div>

      <div className="mt-7">
        <div className="flex justify-center items-center">
          <Label text={"Hesabınız Yok Mu?"} className={"mr-2"} />
          <Link
            to={"register"}
            className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
            Hesap Oluştur
          </Link>
        </div>
      </div>
    </div>
  )
}
