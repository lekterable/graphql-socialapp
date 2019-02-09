import { gql } from 'apollo-boost'

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
      author
      body
    }
  }
`
export const ADD_POST_QUERY = gql`
  mutation AddPost($body: String!) {
    addPost(body: $body) {
      id
      author
      body
    }
  }
`

export const REGISTER_USER_QUERY = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password)
  }
`

export const LOGIN_USER_QUERY = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`
