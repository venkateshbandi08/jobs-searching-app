import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {
    name: '',
    profileImage: '',
    bio: '',
    responseStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({responseStatus: apiStatus.loading})
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        name: formattedProfileDetails.name,
        profileImage: formattedProfileDetails.profileImageUrl,
        bio: formattedProfileDetails.shortBio,
        responseStatus: apiStatus.success,
      })
    } else {
      this.setState({
        responseStatus: apiStatus.failure,
      })
    }
  }

  retryProfileData = () => {
    this.getProfileData()
  }

  renderSuccessView = () => {
    const {name, bio, profileImage} = this.state
    return (
      <div className="profile-container">
        <img src={profileImage} alt="profile" className="profile-image" />
        <h1 className="username">{name}</h1>
        <p className="bio">{bio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.retryProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderedProfileData = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()

      case apiStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return this.renderedProfileData()
  }
}

export default Profile
