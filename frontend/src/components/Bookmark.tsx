import {useParams} from "react-router"

function Bookmark() {
  const {bookmarkId} = useParams()

  return (
    <div>
      <h2>Bookmark {bookmarkId}</h2>
    </div>
  )
}

export default Bookmark
