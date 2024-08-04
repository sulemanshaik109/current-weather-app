import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookData} = props
  const {authorName, coverPic, rating, title, readStatus, id} = bookData

  return (
    <Link to={`/books/${id}`} className="link-item">
      <li className="book-item">
        <img src={coverPic} alt={title} className="book-cover-pic" />
        <div className="book-data-container">
          <h1 className="title">{title}</h1>
          <p className="book-author-name">{authorName}</p>
          <div className="rating-container">
            <p className="text rating-text">Avg Rating </p>
            <BsFillStarFill color="#FBBF24" size={14} />
            <p className="rating">{rating}</p>
          </div>
          <p className="text">
            Status :<span className="status-text"> {readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
