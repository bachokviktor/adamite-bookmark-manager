import React, {useState} from "react"
import {Link, useNavigate} from "react-router"
import api from "../api"

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<string|null>(null)

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await api.post(
	"api/users/",
	{username: username, password: password}
      )

      navigate("/login")
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form action="#" method="post" onSubmit={handleRegister}>
        <label htmlFor="registerUsername">Username</label><br/>
        <input
	  id="registerUsername"
	  name="registerUsername"
	  type="text"
	  placeholder="Username"
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
	  value={password}
	  onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
	    setPassword(e.target.value))
	  } />
	<br/>

	{errors && <p>{errors}</p>}

	<button className="b-success">Register</button>

	<p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
