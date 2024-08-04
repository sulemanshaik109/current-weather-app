import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dsbxrn2tj/image/upload/v1708331327/Group_7484not-found_eyny9i.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="not-found-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
