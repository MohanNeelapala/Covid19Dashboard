import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670406130/Group_7485_zkmcz7.png"
        className="not-found-image"
        alt="not-found-pic"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="home-button">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
