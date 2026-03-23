import React, { useEffect, useState } from "react"
import {useNavigate, Link} from "react-router"
import api from "../api"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [usernameValid, setUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [passwordValid, setPasswordValid] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    setUsernameValid(username.trim().length >= 4)
  }, [username])

  useEffect(() => {
    setPasswordValid(password.trim().length >= 6)
  }, [password])

  useEffect(() => {
    setErrorMessage("")
  }, [username, password])

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post(
	"token/",
	{username: username, password: password}
      )

      console.log(response.data)
      navigate("/")
    } catch (error) {
      setErrorMessage("Something went wrong.")
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

	  {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
	    className="b-success"
	    type="submit"
	    disabled={(usernameValid && passwordValid) ? false : true}>Login</button>
        </form>

	<p>Don't have an account?<br/><Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login
