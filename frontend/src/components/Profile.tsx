function Profile() {
  return (
    <div>
      <h2>This is the user profile</h2>
      <button className="b-danger" onClick={() => {localStorage.clear()}}>LogOut</button>
    </div>
  )
}

export default Profile
