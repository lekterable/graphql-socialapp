import React, { Component } from 'react'
import { Query } from 'react-apollo'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import Profile from '../components/Profile'
import { IS_AUTHORIZED_QUERY } from '../queries'
import './home.scss'

class Home extends Component {
  render() {
    return (
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
  }
}

export default Home
