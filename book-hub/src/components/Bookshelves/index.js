import {Component} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ShelfItem from '../ShelfItem'
import BookItem from '../BookItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    booksList: [],
    shelf: bookshelvesList[0].value,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {shelf, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(book => ({
        authorName: book.author_name,
        coverPic: book.cover_pic,
        id: book.id,
        rating: book.rating,
        title: book.title,
        readStatus: book.read_status,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getBooksList()
  }

  renderSearchInputField = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-icon-btn"
          testid="searchButton"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch color="#0F172A" size={14} />
        </button>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getBooksList()
  }

  selectShelf = activeShelf => {
    this.setState({shelf: activeShelf}, this.getBooksList)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookshelves = () => {
    const {booksList, searchInput, shelf} = this.state
    const noBooks = booksList.length === 0
    const bookshelf = bookshelvesList.find(each => each.value === shelf)

    return (
      <>
        {noBooks ? (
          <div className="no-books-view">
            <img
              src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1708355697/Asset_1_1no-books_zhxy2m.png"
              alt="no books"
            />
            <p className="no-books-text">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        ) : (
          <div className="books-list-container">
            <div className="books-header-container">
              <h1 className="books-header-heading">{bookshelf.label} Books</h1>
            </div>
            <ul className="books-list">
              {booksList.map(eachBook => (
                <BookItem key={eachBook.id} bookData={eachBook} />
              ))}
            </ul>
          </div>
        )}
      </>
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

  renderBookshelvesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookshelves()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {shelf} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          {this.renderSearchInputField()}
          <div className="bookshelves-list-container">
            <h1 className="bookshelves-list-heading">Bookshelves</h1>
            <ul className="bookshelves-list">
              {bookshelvesList.map(each => (
                <ShelfItem
                  key={each.id}
                  shelfData={each}
                  activeShelf={shelf}
                  selectShelf={this.selectShelf}
                />
              ))}
            </ul>
          </div>
          {this.renderBookshelvesView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
