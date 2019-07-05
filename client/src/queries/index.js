import { gql } from 'apollo-boost'

export const IS_AUTHORIZED_QUERY = gql`
  query IsAuthorized {
    isAuthorized @client
  }
`

export const LOGOUT_QUERY = gql`
  mutation Logout {
    logout @client
  }
`

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`

export const GET_POSTS_QUERY = gql`
  query Posts($author: String) {
    posts(author: $author) {
      id
      author {
        username
      }
      body
    }
  }
`
export const ADD_POST_QUERY = gql`
  mutation AddPost($body: String!) {
    addPost(body: $body) {
      id
      author {
        username
      }
      body
    }
  }
`

export const REGISTER_QUERY = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`

export const LOGIN_QUERY = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`
