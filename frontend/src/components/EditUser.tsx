import React, { useState } from "react";
import api from "../api"

interface Props {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  toggleEdit: () => void
}

function EditUser(props: Props) {
  const [username, setUsername] = useState<string|null>(props.username)
  const [email, setEmail] = useState<string|null>(props.email)
  const [firstName, setFirstName] = useState<string|null>(props.firstName)
  const [lastName, setLastName] = useState<string|null>(props.lastName)
  const [errors, setErrors] = useState<string|null>(null)

  const handleEdit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await api.put(
	"api/users/current/",
	{
	  username: username,
	  email: email,
	  first_name: firstName,
	  last_name: lastName,
	}
      )

      props.toggleEdit()
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  return (<div className="auth-container">
	    <h2>Edit User</h2>
	    <form action="#" method="post" onSubmit={handleEdit}>
              <label htmlFor="editUsername">Username</label><br/>
              <input
		id="editUsername"
		name="editUsername"
		type="text"
		placeholder="Username"
		value={username}
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
		  setUsername(e.target.value))
		} />
	      <br/>

	      <label htmlFor="editEmail">Email</label><br/>
              <input
		id="editEmail"
		name="editEmail"
		type="email"
		placeholder="Email"
		value={email}
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
		  setEmail(e.target.value))
		} />
	      <br/>

	      <label htmlFor="editFirstName">First Name</label><br/>
              <input
		id="editFirstName"
		name="editFirstName"
		type="text"
		placeholder="First name"
		value={firstName}
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
		  setFirstName(e.target.value))
		} />
	      <br/>

	      <label htmlFor="editLastName">Last Name</label><br/>
              <input
		id="editLastName"
		name="editLastName"
		type="text"
		placeholder="Last name"
		value={lastName}
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
		  setLastName(e.target.value))
		} />
	      <br/>

	      {errors && <p>{errors}</p>}

	      <button className="b-success">Save</button>
	    </form>
	  </div>)
}

export default EditUser
