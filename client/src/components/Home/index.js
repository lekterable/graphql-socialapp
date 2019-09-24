import React from 'react'
import { useQuery } from 'react-apollo'
import { IS_AUTHORIZED_QUERY } from '../../queries'
import './home.scss'
import PostForm from './PostForm'
import PostList from './PostList'
import Profile from './Profile'

export default () => {
  const {
    data: { isAuthorized }
  } = useQuery(IS_AUTHORIZED_QUERY)

  return (
    <div className="home-page">
      <Profile />
      <div className="home-page__main">
        <span className="home-page__title">Browse posts</span>
        {isAuthorized && <PostForm />}
        <PostList />
      </div>
    </div>
  )
}
