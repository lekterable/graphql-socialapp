import React, { Component } from 'react'
import './register.scss'
import RegisterForm from './RegisterForm'

class Register extends Component {
  handleSubmit = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="register-page">
        <span className="register-page__title">Register</span>
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Register
