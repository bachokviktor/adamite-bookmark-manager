import {Link} from "react-router"

function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404 Not Foud</h2>
      <p>This page does not exist</p>
      <Link to="/">Home Page</Link>
    </div>
  )
}

export default NotFound
