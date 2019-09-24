import React from 'react'
import { useQuery } from 'react-apollo'
import { GET_POSTS_QUERY } from '../../queries'
import Post from './Post'
import './post-list.scss'

export default () => {
  const { loading, error, data: { posts } = {} } = useQuery(GET_POSTS_QUERY)
  if (loading || error) return null

  return (
    <ul className="post-list">
      {posts.map(({ id, author, body }) => (
        <li key={id} className="post-list__item">
          <Post author={author} body={body} />
        </li>
      ))}
    </ul>
  )
}
