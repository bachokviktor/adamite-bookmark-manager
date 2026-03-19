interface BookmarkInterface {
  name: string;
  url: string;
  description: string;
}

function Bookmarks() {
  const bookmarks: BookmarkInterface[] = [
    {
      name: "Bookmark 1",
      url: "https://bookmark1/",
      description: "Some test bookmark"
    },
    {
      name: "Bookmark 2",
      url: "https://bookmark2/",
      description: "Another test bookmark"
    },
    {
      name: "Bookmark 3",
      url: "https://bookmark3/",
      description: "Test bookmark 3"
    },
    {
      name: "Bookmark 4",
      url: "https://bookmark4/",
      description: "Test bookmark 4"
    }
  ]

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
