import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'

import './register.scss'

class Register extends Component {
	render() {
		return (
			<div className="register-page">
				<span className="register-page__title">Register</span>
				<RegisterForm />
			</div>
		)
	}
}

export default Register
