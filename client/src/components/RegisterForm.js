import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { REGISTER_USER_QUERY } from '../queries'
import auth from '../utils/auth'
import './register-form.scss'

export default ({ onSubmit }) => {
  const [state, setState] = useState({ username: '', email: '', password: '' })

  return (
    <Mutation mutation={REGISTER_USER_QUERY}>
      {(registerUser, { client }) => (
        <form
          className="register-form"
          onSubmit={async e => {
            e.preventDefault()
            const { username, email, password } = state
            if (!username || !email || !password) return
            const { data } = await registerUser({
              variables: { username, email, password }
            })
            auth.authorize(data.registerUser)
            await client.resetStore()
            onSubmit()
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
            placeholder="email"
            type="text"
            required
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
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
            Register
          </button>
        </form>
      )}
    </Mutation>
  )
}
