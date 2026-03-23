import {BrowserRouter, Routes, Route} from "react-router"
import AuthProvider from "./components/AuthProvider"
import Protected from "./components/Protected"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import Bookmarks from "./components/Bookmarks"

function App() {
  return (
    <>
      <BrowserRouter>
	<AuthProvider>
	  <Routes>
	    <Route index element={<Home />} />
	    <Route path="/register" element={<Register />} />
	    <Route path="/login" element={<Login />} />
	    <Route element={<Protected />}>
	      <Route path="/bookmarks" element={<Bookmarks />} />
	    </Route>
	  </Routes>
	</AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
