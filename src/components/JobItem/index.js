import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const jobItem = props => {
  const {job} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    location,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <li className="each-job">
      <Link to={`/jobs/${id}`} className="nav-link">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
          />
          <div className="title-rating-container">
            <h1 className="job-company">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-work">
            <div className="location-container">
              <MdLocationOn className="job-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="employment-container">
              <MdWork className="job-icon" />
              <p className="job-employment">{employmentType}</p>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default jobItem
