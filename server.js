const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const app = express()

let posts = [
	{ id: '1', author: 'Kornel', body: 'Hi, its my post no.1' },
	{ id: '2', author: 'Kornel', body: 'Hi, its my post no.2' },
	{ id: '3', author: 'Kornel', body: 'Hi, its my post no.3' }
]

let users = []

const typeDefs = gql`
	scalar Date

	type Post {
		id: String
		author: String
		body: String
		creationDate: Date
	}

	type User {
		id: String
		username: String
		email: String
	}

	type Query {
		post(author: String!): Post
		posts(author: String): [Post]
		user(id: String!): User
		users: [User]
	}

	type Mutation {
		addPost(body: String!): Post
		registerUser(username: String!, password: String!, email: String!): Boolean
		loginUser(username: String!, password: String!): Boolean
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
		post: (root, { author }) => posts.find(post => post.author === author),
		posts: (root, { author }) =>
			author ? posts.filter(post => post.author === author) : posts,
		user: (root, { id }) => users.find(user => user.id === id),
		users: () => users
	},
	Mutation: {
		addPost: (root, { body }) => {
			const post = {
				id: String(posts.length + 1),
				author: 'Kornel',
				body,
				creationDate: new Date()
			}
			posts = [...posts, post]
			return post
		},
		registerUser: (root, { username, password, email }) => {
			const user = { id: String(users.length + 1), username, password, email }
			users = [...users, user]
			return true
		},
		loginUser: (root, { username, password }) => {
			const user = users.find(user => user.username === username)
			if (!user || user.password !== password) return false
			return true
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers.authorization
		if (token)
			return {
				user: {
					id: '1',
					username: 'Kornel'
				}
			}
		return {}
	}
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready`))
