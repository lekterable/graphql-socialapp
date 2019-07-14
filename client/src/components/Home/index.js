import React from 'react'
import { Query } from 'react-apollo'
import { IS_AUTHORIZED_QUERY } from '../../queries'
import './home.scss'
import PostForm from './PostForm'
import PostList from './PostList'
import Profile from './Profile'

export default () => (
  <div className="home-page">
    <Profile />
    <div className="home-page__main">
      <span className="home-page__title">Browse posts</span>
      <Query query={IS_AUTHORIZED_QUERY}>
        {({ data: { isAuthorized } }) => isAuthorized && <PostForm />}
      </Query>
      <PostList />
    </div>
  </div>
)
