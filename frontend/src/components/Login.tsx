import React, {useState} from "react"
import {Link, useNavigate} from "react-router"
import api from "../api"

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<string | null>(null)

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await api.post(
	"api/token/",
	{
	  username: username,
	  password: password
	})

      localStorage.setItem("access-token", response.data.access)
      localStorage.setItem("refresh-token", response.data.refresh)

      navigate("/bookmarks")
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form action="#" method="post" onSubmit={handleLogin}>
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

	<button className="b-success">Login</button>

	<p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}

export default Login
