import React from 'react'
import { Query } from 'react-apollo'
import { GET_POSTS_QUERY } from '../../queries'
import Post from './Post'
import './post-list.scss'

export default () => {
  return (
    <Query query={GET_POSTS_QUERY}>
      {({ loading, error, data: { posts } = {} }) => {
        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>
        return (
          <ul className="post-list">
            {posts.map(({ id, author, body }) => (
              <li key={id} className="post-list__item">
                <Post author={author} body={body} />
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}
