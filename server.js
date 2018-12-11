const { ApolloServer, gql } = require('apollo-server')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

let posts = []

const typeDefs = gql`
	scalar Date

	type Post {
		author: String
		body: String
		creationDate: Date
	}

	type Query {
		getPost(author: String!): Post
		getPosts(author: String!): [Post]
		allPosts: [Post]
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
		getPost: (root, { author }) => posts.find(post => post.author === author),
		getPosts: (root, { author }) => posts.filter(post => post.author === author),
		allPosts: () => posts
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

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`))
