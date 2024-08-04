import {Link} from 'react-router-dom'

import './index.css'

const TopRatedBookItem = props => {
  const {bookDetails} = props
  const {authorName, coverPic, id, title} = bookDetails

  return (
    <Link to={`/books/${id}`} className="link-item">
      <div className="book-card">
        <img src={coverPic} alt={title} className="book-img" />
        <h1 className="title">{title}</h1>
        <p className="author-name">{authorName}</p>
      </div>
    </Link>
  )
}

export default TopRatedBookItem
