import {Component} from 'react'
import Cookies from 'js-cookie'
import { withRouter } from '../withRouter'
import {TailSpin} from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookData()
  }

  getBookData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {params} = this.props
    const {id} = params
    console.log(params)

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        id: fetchedData.book_details.id,
        rating: fetchedData.book_details.rating,
        readStatus: fetchedData.book_details.read_status,
        title: fetchedData.book_details.title,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getBookData()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetailsView = () => {
    const {bookData} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookData

    return (
      <div className="content-container">
        <div className="details-container">
          <img src={coverPic} alt={title} className="details-img" />
          <div className="book-information">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <div className="rating-container">
              <p className="text1">Avg Rating </p>
              <BsFillStarFill color="#FBBF24" size={20} />
              <p className="book-rating">{rating}</p>
            </div>
            <p className="text1">
              Status:<span className="book-status"> {readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1 className="sub-heading">About Author</h1>
          <p className="about-text">{aboutAuthor}</p>
          <h1 className="sub-heading">About Book</h1>
          <p className="about-text">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="bookshelves-error-view-container">
      <img
        src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1708321833/Group_7522_z73vcz.png"
        alt="failure view"
      />
      <p className="failure-heading-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">
          {this.renderBookDetails()}
          <Footer />
        </div>
      </>
    )
  }
}

export default withRouter(BookDetails)
