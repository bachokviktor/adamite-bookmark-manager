import { useEffect, useState } from "react"
import api from "../api"

interface BookmarkInterface {
  id: number,
  name: string
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkInterface[]>([])
  const [errors, setErrors] = useState<string>("")

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const fetchBookmarks = async () => {
    try {
      const response = await api.get("bookmarks/")

      setBookmarks(response.data.results)
    } catch (error) {
      setErrors("Something went wrong")
    }
  }

  return (
    <div className="bookmarks-container">
      <h2>Bookmarks</h2>

      {errors && <p className="error-message">{errors}</p>}

      {bookmarks ?
	<ul>
          {bookmarks.map((value) => <li key={value.id}>{value.name}</li>)}
	</ul> :
	<p>No bookmarks yet.</p>}
    </div>
  )
}

export default Bookmarks
