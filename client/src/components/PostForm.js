import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { ADD_POST_QUERY, GET_POSTS_QUERY } from '../queries'
import { AUTH_TOKEN } from '../utils'
import './post-form.scss'

export default () => {
  // 🎉 hooks 🎉 hype
  const [body, setBody] = useState('')

  return (
    <Mutation
      mutation={ADD_POST_QUERY}
      update={(cache, { data: { addPost } }) => {
        const { posts } = cache.readQuery({ query: GET_POSTS_QUERY })
        cache.writeQuery({
          query: GET_POSTS_QUERY,
          data: {
            posts: [
              ...posts,
              {
                ...addPost,
                id: addPost.id ? addPost.id : String(posts.length + 1)
              }
            ]
          }
        })
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        addPost: {
          __typename: 'Post',
          id: null,
          author: 'Kornel',
          body
        }
      }}
    >
      {addPost =>
        localStorage.getItem(AUTH_TOKEN) && (
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
      }
    </Mutation>
  )
}
