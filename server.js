const { ApolloServer, gql } = require('apollo-server')

let posts = []

const typeDefs = gql`
	type Post {
		author: String
		body: String
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
	Query: {
		getPost: (root, { author }) => posts.find(post => post.author === author),
		getPosts: (root, { author }) => posts.filter(post => post.author === author),
		allPosts: () => posts
	},
	Mutation: {
		addPost: (root, { author, body }) => {
			const post = { author, body }
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
