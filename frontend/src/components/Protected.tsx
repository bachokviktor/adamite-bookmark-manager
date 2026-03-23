import {Outlet, Navigate} from "react-router"

function Protected() {
  const token = localStorage.getItem("access-token")
  
  return (token ? <Outlet /> : <Navigate to="/login" />)
}

export default Protected
