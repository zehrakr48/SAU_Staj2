import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import RedirectButton from "../buttons/redirect-button"
import InputField from "../input-field"

export default function RegisterForm() {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  function setFirstNameInput(e) {
    const searchTerm = e.target.value
    setFirstName(searchTerm)
  }

  function setLastNameInput(e) {
    const searchTerm = e.target.value
    setLastName(searchTerm)
  }

  function setUsernameInput(e) {
    const searchTerm = e.target.value
    setUsername(searchTerm)
  }

  function setEmailInput(e) {
    const searchTerm = e.target.value
    setEmail(searchTerm)
  }

  function setPasswordInput(e) {
    const searchTerm = e.target.value
    setPassword(searchTerm)
  }

  const newUser = async () => {
    const response = await fetch("http://localhost:3000/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
    })

    if (response.status !== 201) {
      alert("Registration failed")
      return
    }

    // Registration confirmation page will added.
    navigate("/")
  }

  return (
    <div className="mt-10">
      <div>
        <InputField
          type={"text"}
          value={firstName}
          onChange={setFirstNameInput}
          placeholder={"First Name"}
        />
      </div>
      <div className="mt-7">
        <InputField
          type={"text"}
          value={lastName}
          onChange={setLastNameInput}
          placeholder={"Last Name"}
        />
      </div>
      <div className="mt-7">
        <InputField
          type={"text"}
          value={username}
          onChange={setUsernameInput}
          placeholder={"Username"}
        />
      </div>
      <div className="mt-7">
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
      <div className="mt-7">
        <RedirectButton
          text={"Kaydol"}
          redirectPath={"/"}
          onClickModifier={newUser}
          className={
            "bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          }
        />
      </div>
    </div>
  )
}
