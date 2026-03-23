import {BrowserRouter, Routes, Route} from "react-router"
import AuthProvider from "./components/AuthProvider"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"

function App() {
  return (
    <>
      <BrowserRouter>
	<AuthProvider>
	  <Routes>
	    <Route path="/" element={<Home />} />
	    <Route path="/register" element={<Register />} />
	    <Route path="/login" element={<Login />} />
	  </Routes>
	</AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
