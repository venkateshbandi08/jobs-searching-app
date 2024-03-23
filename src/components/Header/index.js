import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {MdWork} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="nav-icons-container">
        <li>
          <Link to="/" className="nav-link">
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <MdWork className="nav-icon" />
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            <FiLogOut className="nav-icon" onClick={onLogout} />
          </Link>
        </li>
      </ul>

      <ul className="nav-options-container">
        <div className="home-job-container">
          <li>
            <Link to="/" className="nav-link">
              <p className="option">Home</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <p className="option">Jobs</p>
            </Link>
          </li>
        </div>
        <li>
          <Link to="/login" className="nav-link">
            <button type="button" className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
