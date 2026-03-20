import { useEffect, useState } from "react";
import api  from "../api"

interface BookmarkInterface {
  name: string;
  url: string;
  description: string;
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkInterface[]>([])
  const [errors, setErrors] = useState<string|null>(null)

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const fetchBookmarks = async () => {
    try {
      const response = await api.get("api/bookmarks/")

      setBookmarks(response.data.results)
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  if (errors) {
    return <p>{errors}</p>
  }

  return (
    <div className="bookmark-container">
      {bookmarks.map((val, ind) => (
	<div className="bookmark-card" key={ind}>
	  <h2>{val.name}</h2>
	  <a href={val.url}>{val.url}</a>
	  <p>{val.description}</p>
	</div>
      ))}
    </div>
  )
}

export default Bookmarks
