import {useAuth} from "./AuthProvider"

function Home() {
  const {isAuthenticated} = useAuth()

  return (isAuthenticated ? <h2>Wlecome to the website!</h2> : <h2>You are not authenticated</h2>)
}

export default Home
