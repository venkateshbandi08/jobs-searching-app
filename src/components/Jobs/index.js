import {Component} from 'react'
import Cookie from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    employmentTypes: [],
    salaryRange: '',
    responseStatus: apiStatus.failure,
    searchJob: '',
    jobs: '',
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({responseStatus: apiStatus.loading})
    const {salaryRange, employmentTypes, searchJob} = this.state
    const employmentTypesString = employmentTypes.join(',')
    const jwtToken = Cookie.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesString}&minimum_package=${salaryRange}&search=${searchJob}`

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.jobs.map(job => {
        const eachJob = {
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }
        return eachJob
      })
      this.setState({jobs: formattedData, responseStatus: apiStatus.success})
    } else {
      this.setState({
        responseStatus: apiStatus.failure,
      })
    }
  }

  filterEmploymentType = id => {
    const {employmentTypes} = this.state
    if (employmentTypes.includes(id)) {
      const filteredTypes = employmentTypes.filter(item => item !== id)
      this.setState({employmentTypes: filteredTypes}, this.getJobDetails)
    } else {
      this.setState(
        prevState => ({
          employmentTypes: [...prevState.employmentTypes, id],
        }),
        this.getJobDetails,
      )
    }
  }

  filterSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobDetails)
  }

  onRetryJobs = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.onRetryJobs}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-context">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsData = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <div className="jobs-list-container">
        {jobs.map(eachJob => (
          <JobItem job={eachJob} key={eachJob.id} />
        ))}
      </div>
    )
  }

  onSearchJob = event => {
    this.setState({searchJob: event.target.value})
  }

  onSearchClick = () => {
    this.getJobDetails()
  }

  renderData = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case apiStatus.success:
        return this.renderJobsData()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filter-container">
            <div className="jobs-input-container show-1">
              <label htmlFor="searchInput1" className="input-label">
                Search
              </label>
              <input
                id="searchInput1"
                onChange={this.onSearchJob}
                type="search"
                placeholder="Search"
                className="jobs-input-element"
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearchClick}
                aria-label="Search"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              filterEmploymentType={this.filterEmploymentType}
              filterSalaryRange={this.filterSalaryRange}
            />
          </div>
          <div className="input-jobs-list-container">
            <div className="jobs-input-container show-2">
              <label htmlFor="searchInput2" className="input-label">
                Search
              </label>
              <input
                id="searchInput2"
                onChange={this.onSearchJob}
                type="search"
                placeholder="Search"
                className="jobs-input-element"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onSearchClick}
                aria-label="Search"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderData()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
