import React from 'react'
import { useMutation, useQuery } from 'react-apollo'
import Gravatar from 'react-gravatar'
import { NavLink } from 'react-router-dom'
import { IS_AUTHORIZED_QUERY, LOGOUT_QUERY, ME_QUERY } from '../../queries'
import './header.scss'

export default () => {
  const {
    data: { isAuthorized }
  } = useQuery(IS_AUTHORIZED_QUERY)
  const { data: { me } = {}, loading, error } = useQuery(ME_QUERY)
  const [logout] = useMutation(LOGOUT_QUERY)

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
        {isAuthorized ? (
          loading || error ? null : (
            <>
              <div className="nav__user">
                <Gravatar
                  className="nav__user-img"
                  email={me.email}
                  size={35}
                />
                <span className="nav__username">{me.username}</span>
              </div>
              <span className="nav__item" onClick={logout}>
                Logout
              </span>
            </>
          )
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
