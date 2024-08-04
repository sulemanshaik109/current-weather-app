import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { withRouter } from '../withRouter'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {showMobileMenu: false}

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickMenuBtn = () => {
    this.setState({showMobileMenu: true})
  }

  onClickClose = () => {
    this.setState({showMobileMenu: false})
  }

  render() {
    const {showMobileMenu} = this.state

    return (
      <>
        <nav className="nav-header">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1707908969/Group_7732_dw8wrb.png"
                className="header-logo"
                alt="website logo"
              />
            </Link>
            <button
              type="button"
              className="hamburger_btn"
              onClick={this.onClickMenuBtn}
            >
              <GiHamburgerMenu size={16} color="#475569" />
            </button>
          </div>
          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1707908969/Group_7732_dw8wrb.png"
                className="header-logo"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/shelf" className="nav-link">
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>
        {showMobileMenu && (
          <div className="mobile-menu">
            <ul className="mobile-menu-list">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/shelf" className="nav-link">
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="close-btn"
              onClick={this.onClickClose}
            >
              <AiFillCloseCircle color="#000000" size={24} />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
