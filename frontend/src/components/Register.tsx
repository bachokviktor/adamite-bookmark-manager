import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router"
import api from "../api"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [usernameValid, setUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [matchPassword, setMatchPassword] = useState<string>("")
  const [passwordMatching, setPasswordMatching] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    setUsernameValid(username.trim().length >= 4)
  }, [username])

  useEffect(() => {
    setPasswordValid(password.trim().length >= 6)

    setPasswordMatching(password === matchPassword)
  }, [password, matchPassword])

  useEffect(() => {
    setErrorMessage("")
  }, [username, password, matchPassword])

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post(
	"users/",
	{username: username, password: password}
      )

      console.log(response.data)
    } catch (error) {
      setErrorMessage("Something went wrong.")
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Registration</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="usernameInput">Username {!usernameValid && (username.trim().length > 0) ? <span className="error-message">Invalid</span> : ""}</label><br/>
          <input
	    name="usernameInput"
	    id="usernameInput"
	    type="text"
	    required
	    placeholder="username"
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}}
	    value={username} /><br/>

          <label htmlFor="passwordInput">Password {!passwordValid && (password.trim().length > 0) ? <span className="error-message">Invalid</span> : ""}</label><br/>
          <input
	    name="passwordInput"
	    id="passwordInput"
	    type="password"
	    required
	    placeholder="password"
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
	    value={password} /><br/>

          <label htmlFor="matchPasswordInput">Confirm Password {!passwordMatching && (matchPassword.trim().length > 0) ? <span className="error-message">Doesn't match</span> : ""}</label><br/>
          <input
	    name="matchPasswordInput"
	    id="matchPasswordInput"
	    type="password"
	    required
	    placeholder="confirm password"
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMatchPassword(e.target.value)}}
	    value={matchPassword} /><br/>

	  {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
	    className="b-success"
	    type="submit"
	    disabled={(usernameValid && passwordValid && passwordMatching) ? false : true}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
