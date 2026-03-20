import { useEffect, useState } from "react"
import {Outlet, NavLink} from "react-router"

function Layout() {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("access-token")
    if (token) setAuthenticated(true)
  }, [])

  const navAuthenticated = <>
			     <li className="nav-element">
			       <NavLink to="/bookmarks">Bookmarks</NavLink>
			     </li>
			     <li className="nav-element">
			       <NavLink to="/profile">Profile</NavLink>
			     </li>
			   </>

  const navAnonymous = <>
			 <li className="nav-element">
			   <NavLink to="/login">Login</NavLink>
			 </li>
			 <li className="nav-element">
			   <NavLink to="/register">Register</NavLink>
			 </li>
		       </>

  return (
    <>
      <nav className="navbar">
	<ul className="nav-list">
          <li className="nav-element">
	    <NavLink to="/">Home</NavLink>
	  </li>
          {authenticated ? navAuthenticated : navAnonymous}
	</ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
