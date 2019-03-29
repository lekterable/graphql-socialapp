import React from 'react'
import { Query } from 'react-apollo'
import Gravatar from 'react-gravatar'
import { ME_QUERY } from '../queries'
import './profile.scss'

export default () => {
  return (
    <Query query={ME_QUERY}>
      {({ loading, error, data: { me } = {} }) => {
        if (loading || error || !me) return null
        return (
          <div className="home-page__profile">
            <div className="profile__header">
              <Gravatar className="profile__img" email={me.email} size={50} />
              <span className="profile__username">{me.username}</span>
            </div>
          </div>
        )
      }}
    </Query>
  )
}
