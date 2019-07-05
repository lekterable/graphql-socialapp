import React from 'react'
import { Mutation, Query } from 'react-apollo'
import Gravatar from 'react-gravatar'
import { NavLink } from 'react-router-dom'
import { IS_AUTHORIZED_QUERY, LOGOUT_QUERY, ME_QUERY } from '../queries'
import './header.scss'

export default () => (
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
      <Query query={IS_AUTHORIZED_QUERY}>
        {({ data: { isAuthorized } }) =>
          isAuthorized ? (
            <Query query={ME_QUERY}>
              {({ loading, error, data: { me } = {} }) => {
                if (loading || error) return null
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
                    <Mutation mutation={LOGOUT_QUERY}>
                      {logout => {
                        return (
                          <span className="nav__item" onClick={logout}>
                            Logout
                          </span>
                        )
                      }}
                    </Mutation>
                  </>
                )
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
          )
        }
      </Query>
    </div>
  </div>
)
