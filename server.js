const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const app = express()

let posts = []

const typeDefs = gql`
	scalar Date

	type Post {
		author: String
		body: String
		creationDate: Date
	}

	type Query {
		post(author: String!): Post
		posts(author: String): [Post]
	}

	type Mutation {
		addPost(author: String!, body: String!): Post
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
			author ? posts.filter(post => post.author === author) : posts
	},
	Mutation: {
		addPost: (root, { author, body }) => {
			const post = { author, body, creationDate: new Date() }
			posts = [...posts, post]
			return post
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready`))
