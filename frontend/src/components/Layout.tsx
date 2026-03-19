import {Outlet, NavLink} from "react-router"

function Layout() {
  return (
    <>
      <nav className="navbar">
	<ul className="nav-list">
          <li className="nav-element">
	    <NavLink to="/">Home</NavLink>
	  </li>
          <li className="nav-element">
	    <NavLink to="/bookmarks">Bookmarks</NavLink>
	  </li>
          <li className="nav-element">
	    <NavLink to="/profile">Profile</NavLink>
	  </li>
          <li className="nav-element">
	    <NavLink to="/login">Login</NavLink>
	  </li>
          <li className="nav-element">
	    <NavLink to="/register">Register</NavLink>
	  </li>
	</ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
