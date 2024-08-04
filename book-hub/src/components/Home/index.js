import {Component} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {TailSpin} from "react-loader-spinner"
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'
import Footer from '../Footer'
import TopRatedBookItem from '../TopRatedBookItem'
import './index.css'


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedBooksList()
  }

  getTopRatedBooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
        title: book.title,
      }))
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getTopRatedBooksList()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <TailSpin color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {topRatedBooksList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {topRatedBooksList.map(eachBook => (
            <TopRatedBookItem bookDetails={eachBook} key={eachBook.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="home-error-view-container">
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

  renderTopRatedBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Navigate to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="intro">
            <h1 className="home-title">Find Your Next Favorite Books?</h1>
            <p className="home-text">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button type="button" className="find-books-btn">
                Find Books
              </button>
            </Link>
          </div>
          <div className="top_rated_books_container">
            <h1 className="top_rated_heading">Top Rated Books</h1>
            {this.renderTopRatedBooks()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
