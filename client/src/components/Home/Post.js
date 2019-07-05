import React from 'react'
import './post.scss'

export default ({ author, body }) => {
  return (
    <div className="post">
      <span className="post__author">{author.username}</span>
      <span className="post__body">{body}</span>
    </div>
  )
}
