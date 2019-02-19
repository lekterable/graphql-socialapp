import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import './login.scss'

class Login extends Component {
  handleSubmit = () => this.props.history.push('/')

  render() {
    return (
      <div className="login-page">
        <span className="login-page__title">Login</span>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Login
