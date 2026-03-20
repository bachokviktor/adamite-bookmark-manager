import {BrowserRouter, Routes, Route} from "react-router"
import Layout from "./components/Layout"
import LoginRequired from "./components/LoginRequired"
import Home from "./components/Home"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Register from "./components/Register"
import Bookmarks from "./components/Bookmarks"
import Bookmark from "./components/Bookmark"
import NotFound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
	  <Route path="login" element={<Login />} />
	  <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
	  <Route path="bookmarks" element={<LoginRequired />}>
	    <Route index element={<Bookmarks />} />
	    <Route path=":bookmarkId" element={<Bookmark />} />
	  </Route>
	  <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
