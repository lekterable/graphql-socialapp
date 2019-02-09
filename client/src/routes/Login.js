import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

import './login.scss'

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <span className="login-page__title">Login</span>
        <LoginForm />
      </div>
    )
  }
}

export default Login
