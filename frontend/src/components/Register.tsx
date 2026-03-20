import {useState} from "react"
import {Link} from "react-router"

function Register() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form action="#" method="post">
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

	<button className="b-success">Register</button>

	<p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
