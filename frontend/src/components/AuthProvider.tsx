import {createContext, useContext, useState} from "react"

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

  const login = ({access, refresh}: LoginInterface) => {
    localStorage.setItem("refresh-token", refresh)
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
