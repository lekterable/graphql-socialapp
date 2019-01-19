import React, { Component } from 'react'
import PostList from '../components/PostList'

import './home.scss'
class Home extends Component {
	render() {
		const posts = [
			{ id: '1', author: 'Kornel', body: 'Hi, its my post no.1' },
			{ id: '2', author: 'Kornel', body: 'Hi, its my post no.2' },
			{ id: '3', author: 'Kornel', body: 'Hi, its my post no.3' }
		]

		return (
			<div className="home-page">
				<PostList posts={posts} />
			</div>
		)
	}
}

export default Home
