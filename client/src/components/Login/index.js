import React, { Component } from 'react'
import './login.scss'
import LoginForm from './LoginForm'

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
