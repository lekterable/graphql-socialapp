const express = require('express')
const { ApolloServer, gql, ApolloError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const jwt = require('jsonwebtoken')

const app = express()

let posts = [
  { id: '1', author: '1', body: 'Hi, its my post no.1' },
  { id: '2', author: '1', body: 'Hi, its my post no.2' },
  { id: '3', author: '1', body: 'Hi, its my post no.3' }
]

let users = [
  {
    id: '1',
    username: 'Kornel',
    email: 'lekterable@gmail.com',
    password: 'pass'
  }
]

const typeDefs = gql`
  scalar Date

  type Post {
    id: String
    author: User
    body: String
    creationDate: Date
  }

  type User {
    id: String
    username: String
    email: String
  }

  type Query {
    me: User
    post(author: String!): Post
    posts(author: String): [Post]
    user(id: String!): User
    users: [User]
  }

  type Mutation {
    addPost(body: String!): Post
    register(username: String!, password: String!, email: String!): String
    login(username: String!, password: String!): String
  }
`

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral({ kind, value }) {
      if (kind === Kind.INT) return Number(value)
      return null
    }
  }),
  Query: {
    me: (_, __, { user }) =>
      user ? user : new ApolloError('UNAUTHORIZED', 401),
    post: (_, { author }) => posts.find(post => post.author === author),
    posts: (_, { author }) =>
      author ? posts.filter(post => post.author === author) : posts,
    user: (_, { id }) => users.find(user => user.id === id),
    users: () => users
  },
  Mutation: {
    addPost: (_, { body }, { user }) => {
      const post = {
        id: String(posts.length + 1),
        author: user.id,
        body,
        creationDate: new Date()
      }
      posts = [...posts, post]
      return post
    },
    register: (_, { username, password, email }) => {
      const user = { id: String(users.length + 1), username, password, email }
      users = [...users, user]
      return jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SECRET
      )
    },
    login: (_, { username, password }) => {
      const user = users.find(user => user.username === username)
      if (!user || user.password !== password) throw new Error('User not found')
      return jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SECRET
      )
    }
  },
  Post: {
    author: ({ author }) => users.find(user => user.id === author)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization
    const bearer = 'Bearer '
    if (token && token.length > bearer.length) {
      try {
        const decoded = jwt.verify(
          token.replace(bearer, ''),
          process.env.JWT_SECRET
        )
        const user = users.find(user => user.id === decoded.id)
        if (!user) throw new Error('User not found')
        return {
          user
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    return {}
  }
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready`))
