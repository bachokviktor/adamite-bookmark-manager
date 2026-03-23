import {createContext, useContext, useEffect, useState} from "react"
import api from "../api"

interface AuthContextInterface {
  token: string;
  isAuthenticated: boolean;
  login: (params: LoginInterface) => void;
  logout: () => void;
}

interface PropsInterface {
  children: React.ReactNode;
}

interface LoginInterface {
  access: string;
  refresh: string;
}

export const AuthContext = createContext<AuthContextInterface>({token: "", isAuthenticated: false, login: () => {}, logout: () => {}})

function AuthProvider({children}: PropsInterface) {
  const [token, setToken] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("access-token")

    if (token) {
      setToken(token)
      setIsAuthenticated(true)
    }
  }, [])

  const login = ({access, refresh}: LoginInterface) => {
    localStorage.setItem("refresh-token", refresh)
    localStorage.setItem("access-token", access)
    setToken(access)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.clear()
    setToken("")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{token, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
