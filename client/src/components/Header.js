import React from 'react'

import { Link, NavLink } from 'react-router-dom'

import './header.scss'

export default () => {
	return (
		<div className="header">
			<div className="header__left">
				<div className="header__logo">graphql-socialapp</div>
				<ul className="nav">
					<NavLink
						className="nav__item"
						activeClassName="nav__item--active"
						exact
						to="/"
					>
						Home
					</NavLink>
				</ul>
			</div>
			<div className="header__right">
				<Link to="/register" className="header__register">
					<span>Register</span>
				</Link>
				<Link to="/login" className="header__login">
					<span>Login</span>
				</Link>
			</div>
		</div>
	)
}
