import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    activeHomeTab: true,
    activeAboutTab: false,
    displayNavItems: false,
  }

  onClickNavBarIcon = () => {
    this.setState(prevState => ({displayNavItems: !prevState.displayNavItems}))
  }

  activeHomeTab = () => {
    this.setState({
      activeHomeTab: true,
      activeAboutTab: false,
      displayNavItems: false,
    })
  }

  activeAboutTab = () => {
    this.setState({
      activeHomeTab: false,
      activeAboutTab: true,
      displayNavItems: false,
    })
  }

  render() {
    const {activeHomeTab, activeAboutTab, displayNavItems} = this.state
    const activeHomeClass = activeHomeTab === true ? 'active-tab-class' : ''
    const activeAboutClass = activeAboutTab === true ? 'active-tab-class' : ''
    return (
      <div className="header-container">
        <div className="navbar-sm">
          <Link to="/" className="nav-link">
            <h1 className="heading">
              COVID19 <span className="span-class">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            onClick={this.onClickNavBarIcon}
            className="nav-button"
          >
            <img
              src="https://res.cloudinary.com/dexuc6xul/image/upload/v1670478306/add-to-queue_1_zvhq6z.png"
              className="nav-img"
              alt="nav-bar-icon"
            />
          </button>
        </div>
        {displayNavItems && (
          <div className="nav-sm-display">
            <ul className="nav-items-sm-display">
              <Link to="/" className="nav-link">
                <li
                  className={`nav-item ${activeHomeClass}`}
                  onClick={this.activeHomeTab}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="nav-link">
                <li
                  className={`nav-item ${activeAboutClass}`}
                  onClick={this.activeAboutTab}
                >
                  About
                </li>
              </Link>
            </ul>
          </div>
        )}
        <div className="navbar-lg-container">
          <Link to="/" className="nav-link">
            <h1 className="heading">
              COVID19 <span className="span-class">INDIA</span>
            </h1>
          </Link>
          <div className="nav-lg-display">
            <ul className="nav-items-lg-display">
              <Link to="/" className="nav-link">
                <li
                  className={`nav-item ${activeHomeClass}`}
                  onClick={this.activeHomeTab}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="nav-link">
                <li
                  className={`nav-item ${activeAboutClass}`}
                  onClick={this.activeAboutTab}
                >
                  About
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
