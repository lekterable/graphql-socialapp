import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { LOGIN_USER_QUERY } from '../queries'

import './register-form.scss'

export default () => {
	const [state, setState] = useState({ username: '', password: '' })

	return (
		<Mutation mutation={LOGIN_USER_QUERY}>
			{loginUser => (
				<form
					className="register-form"
					onSubmit={e => {
						e.preventDefault()
						const { username, password } = state
						if (!username || !password) return
						loginUser({ variables: { username, password } })
						setState({ username: '', password: '' })
					}}
				>
					<input
						className="input-text"
						placeholder="username"
						type="text"
						required
						value={state.username}
						onChange={e => setState({ ...state, username: e.target.value })}
					/>
					<input
						className="input-text"
						placeholder="password"
						type="password"
						required
						value={state.password}
						onChange={e => setState({ ...state, password: e.target.value })}
					/>
					<button type="submit" className="btn btn--primary">
						Login
					</button>
				</form>
			)}
		</Mutation>
	)
}
