import React from 'react'

export default ({ author, body }) => {
	return (
		<div className="post">
			<span className="post__author">{author}</span>
			<span className="post__body">{body}</span>
		</div>
	)
}
