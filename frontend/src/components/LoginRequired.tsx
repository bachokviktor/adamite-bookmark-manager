import { jwtDecode } from "jwt-decode"
import {useEffect, useState} from "react"
import {Navigate, Outlet} from "react-router"
import api from "../api"

function LoginRequired() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    auth()
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh-token")

    try {
      const response = await api.post(
	"api/token/refresh/",
	{refresh: refreshToken,}
      )

      localStorage.setItem("access-token", response.data.access)
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem("access-token")

    if (!token) {
      setIsAuthenticated(false)
      return
    }

    const decoded = jwtDecode(token)
    const now = Date.now() / 1000

    if (decoded.exp < now) {
      await refreshToken()
    } else {
      setIsAuthenticated(true)
    }
  }

  if (isAuthenticated === null) {
    return <p>Loading...</p>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default LoginRequired
