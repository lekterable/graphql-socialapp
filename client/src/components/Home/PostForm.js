import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { ADD_POST_QUERY, GET_POSTS_QUERY, ME_QUERY } from '../../queries'
import auth from '../../utils/auth'
import './post-form.scss'

export default () => {
  const [body, setBody] = useState('')
  const [addPost] = useMutation(ADD_POST_QUERY, {
    update: (cache, { data: { addPost } }) => {
      const { posts } = cache.readQuery({ query: GET_POSTS_QUERY })
      const { me } = cache.readQuery({ query: ME_QUERY })
      cache.writeQuery({
        query: GET_POSTS_QUERY,
        data: {
          posts: [
            ...posts,
            {
              ...addPost,
              id: addPost.id ? addPost.id : String(posts.length + 1),
              author: {
                ...addPost.author,
                username: addPost.author.username
                  ? addPost.author.username
                  : me.username
              }
            }
          ]
        }
      })
    },
    optimisticResponse: {
      __typename: 'Mutation',
      addPost: {
        __typename: 'Post',
        id: null,
        author: { __typename: 'User', username: null },
        body
      }
    }
  })

  return (
    auth.isAuthorized && (
      <form
        onSubmit={e => {
          e.preventDefault()
          addPost({ variables: { body } })
          setBody('')
        }}
        className="post-form"
      >
        <input
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
          className="post-form__input"
        />
        <button type="submit" className="post-form__submit">
          Add post
        </button>
      </form>
    )
  )
}
