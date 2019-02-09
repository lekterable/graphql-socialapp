import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Query } from 'react-apollo'
import { ME_QUERY } from '../queries'

import './header.scss'

export default () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
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
        {token ? (
          <Query
            query={ME_QUERY}
            onError={() => {
              localStorage.removeItem('token')
              setToken('')
            }}
          >
            {({ loading, error, data }) => {
              if (loading || error) return null
              console.log(data)
              return <span>{data.username}</span>
            }}
          </Query>
        ) : (
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
        )}
      </div>
    </div>
  )
}
