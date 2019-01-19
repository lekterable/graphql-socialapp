import React from 'react'
import Post from './Post'

export default ({ posts }) => {
	const filledPosts = posts.map(({ id, author, body }) => (
		<li key={id} className="post-list__item">
			<Post author={author} body={body} />
		</li>
	))

	return <ul className="post-list">{filledPosts}</ul>
}
