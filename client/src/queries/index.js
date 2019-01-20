import { gql } from 'apollo-boost'

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
