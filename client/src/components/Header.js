import React from 'react'
import { Query } from 'react-apollo'
import { NavLink } from 'react-router-dom'
import { ME_QUERY } from '../queries'
import { AUTH_TOKEN } from '../utils'
import './header.scss'

export default () => {
  const handleLogout = client => {
    localStorage.removeItem(AUTH_TOKEN)
    client.resetStore()
  }

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
        <Query query={ME_QUERY}>
          {({ loading, error, data: { me } = {}, client }) => {
            if (loading || error || !me) {
              if (!loading && !me && localStorage.getItem(AUTH_TOKEN))
                handleLogout(client)
              return (
                <>
                  <NavLink
                    to="/register"
                    className="nav__item"
                    activeClassName="nav__item--active"
                  >
                    <span>Register</span>
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="nav__item"
                    activeClassName="nav__item--active"
                  >
                    <span>Login</span>
                  </NavLink>
                </>
              )
            }
            return (
              <>
                <span>{me.username}</span>
                <span
                  className="nav__item"
                  onClick={() => handleLogout(client)}
                >
                  Logout
                </span>
              </>
            )
          }}
        </Query>
      </div>
    </div>
  )
}
