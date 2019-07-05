import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { LOGIN_QUERY } from '../../queries'
import auth from '../../utils/auth'
import './login-form.scss'

export default ({ onSubmit }) => {
  const [state, setState] = useState({ username: '', password: '' })

  return (
    <Mutation mutation={LOGIN_QUERY}>
      {(login, { client }) => (
        <form
          className="register-form"
          onSubmit={async e => {
            e.preventDefault()
            const { username, password } = state
            if (!username || !password) return
            const { data } = await login({
              variables: { username, password }
            })
            auth.authorize(data.login)
            await client.resetStore()
            setState({ username: '', password: '' })
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
