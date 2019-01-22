import React from 'react'

import { NavLink } from 'react-router-dom'

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
				<div className="header__register">Register</div>
				<div className="header__login">Login</div>
			</div>
		</div>
	)
}
