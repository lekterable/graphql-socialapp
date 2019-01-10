import React from 'react'

import './header.scss'

export default () => {
	return (
		<div className="header">
			<div className="header__left">
				<div className="header__logo">graphql-socialapp</div>
				<ul className="header__nav">
					<li className="header__nav__item">Home</li>
				</ul>
			</div>
			<div className="header__right">
				<div className="header__register">Register</div>
				<div className="header__login">Login</div>
			</div>
		</div>
	)
}
