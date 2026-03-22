import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router"
import api from "../api"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [matchPassword, setMatchPassword] = useState<string>("")
  const [usernameValid, setUsernameValid] = useState<boolean>(false)
  const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>("")

  useEffect(() => {
    if (username.trim()) setUsernameValid(username.length > 4)
  }, [username])

  useEffect(() => {
    if (password.trim()) setPasswordConfirmed(password === matchPassword)
  }, [password, matchPassword])

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await api.post(
	"api/users/",
	{username: username, password: password}
      )

      navigate("/login")
    } catch (error: any) {
      setErrors("Something went wrong!")
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
	<h2>Register</h2>
	<form onSubmit={handleRegister}>
          <label htmlFor="registerUsername">Username</label><br/>
          <input
	    id="registerUsername"
	    name="registerUsername"
	    type="text"
	    placeholder="Username"
	    required
	    value={username}
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
	      setUsername(e.target.value))
	    } />
	  <br/>

          <label htmlFor="registerPassword">Password</label><br/>
          <input
	    id="registerPassword"
	    name="registerPassword"
	    type="password"
	    placeholder="Password"
	    required
	    value={password}
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
	      setPassword(e.target.value))
	    } />
	  <br/>

	  <label htmlFor="registerMatchPassword">Confirm Password</label><br/>
          <input
	    id="registerMatchPassword"
	    name="registerMatchPassword"
	    type="password"
	    placeholder="Confirm Password"
	    required
	    value={matchPassword}
	    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
	      setMatchPassword(e.target.value))
	    } />
	  <br/>


	  {errors && <p className="msg-danger">{errors}</p>}

	  <button
	    className="b-success"
	    disabled={passwordConfirmed && usernameValid ? false : true}>Register</button>

	  <p>Already have an account? <Link to="/login">Login</Link></p>
	</form>
      </div>
    </div>
  )
}

export default Register
