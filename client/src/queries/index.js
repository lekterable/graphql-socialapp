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
