import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    name: '',
    pass: '',
    nameError: false,
    passError: false,
    isError: false,
    errorMsg: '',
  }

  onBlurName = () => {
    const {name} = this.state
    if (name === '') {
      this.setState({nameError: true})
    } else {
      this.setState({nameError: false})
    }
  }

  onBlurPass = () => {
    const {pass} = this.state
    if (pass === '') {
      this.setState({passError: true})
    } else {
      this.setState({passError: false})
    }
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangePass = event => {
    this.setState({pass: event.target.value})
  }

  onSuccessResponse = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 10})
    const {history} = this.props
    history.replace('/')
  }

  onFailureResponse = msg => {
    this.setState({
      errorMsg: msg,
      isError: true,
    })
  }

  onSubmitLoginForm = async event => {
    const {name, pass} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const details = {
      username: name,
      password: pass,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessResponse(data.jwt_token)
      this.setState({name: '', pass: ''})
    } else {
      this.onFailureResponse(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {name, pass, isError, errorMsg, nameError, passError} = this.state
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <div className="input-container">
            <label className="label-element" htmlFor="name">
              USERNAME
            </label>
            <input
              value={name}
              placeholder="Username"
              type="text"
              id="name"
              className="input-element"
              onBlur={this.onBlurName}
              onChange={this.onChangeName}
            />
          </div>
          <p className="error-message">
            {nameError ? '*Please enter username' : ''}
          </p>
          <div className="input-container">
            <label className="label-element" htmlFor="pass">
              PASSWORD
            </label>
            <input
              value={pass}
              placeholder="Password"
              type="password"
              id="pass"
              className="input-element"
              onBlur={this.onBlurPass}
              onChange={this.onChangePass}
            />
          </div>
          <p className="error-message">
            {passError ? '*Please enter password' : ''}
          </p>

          <button type="submit" className="submit-button">
            Login
          </button>
          {isError && <p className="error-message">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
