import React from 'react'
import './register.scss'
import RegisterForm from './RegisterForm'

export default ({ history }) => {
  const handleSubmit = () => history.push('/')

  return (
    <div className="register-page">
      <span className="register-page__title">Register</span>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  )
}
