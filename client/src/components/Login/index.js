import React from 'react'
import './login.scss'
import LoginForm from './LoginForm'

export default ({ history }) => {
  const handleSubmit = () => history.push('/')

  return (
    <div className="login-page">
      <span className="login-page__title">Login</span>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}
