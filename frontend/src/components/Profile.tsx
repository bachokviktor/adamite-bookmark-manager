import { useNavigate } from "react-router"
import api from "../api"
import { useEffect, useState } from "react"
import EditUser from "./EditUser"

function Profile() {
  const navigate = useNavigate()

  const [username, setUsername] = useState<string|null>(null)
  const [email, setEmail] = useState<string|null>(null)
  const [firstName, setFirstName] = useState<string|null>(null)
  const [lastName, setLastName] = useState<string|null>(null)
  const [errors, setErrors] = useState<string|null>(null)
  const [editing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const response = await api.get("api/users/current/")

      setUsername(response.data.username)
      setEmail(response.data.email)
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  const handleDeleteUser = async () => {
    try {
      await api.delete("api/users/current/")
      localStorage.clear()
      navigate("/login")
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const toggleEdit = () => {
    setEditing((prevEditing) => !prevEditing)
  }

  if (errors) {
    return <p>{errors}</p>
  }

  if (editing) {
    return <EditUser
	     username={username}
	     email={email}
	     firstName={firstName}
	     lastName={lastName}
	     toggleEdit={toggleEdit} />
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Username:</b> {username}</p>
      <p><b>Email:</b> {email ? email : "Not specified"}</p>
      <p><b>First Name:</b> {firstName ? firstName : "Not specified"}</p>
      <p><b>Last Name:</b> {lastName ? lastName : "Not specified"}</p>

      <button className="b-neutral" onClick={toggleEdit}>Edit User</button>
      <button className="b-danger" onClick={handleDeleteUser}>Delete User</button>
      <button className="b-danger" onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default Profile
