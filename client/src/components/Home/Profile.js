import React from 'react'
import { useQuery } from 'react-apollo'
import Gravatar from 'react-gravatar'
import { ME_QUERY } from '../../queries'
import './profile.scss'

export default () => {
  const { loading, error, data: { me } = {} } = useQuery(ME_QUERY)
  if (loading || error || !me) return null

  return (
    <div className="home-page__profile">
      <div className="profile__header">
        <Gravatar className="profile__img" email={me.email} size={50} />
        <span className="profile__username">{me.username}</span>
      </div>
    </div>
  )
}
