import React from 'react'
import { Query } from 'react-apollo'
import Gravatar from 'react-gravatar'
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
                <div className="nav__user">
                  <Gravatar
                    className="nav__user-img"
                    email={me.email}
                    size={35}
                  />
                  <span className="nav__username">{me.username}</span>
                </div>
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
