import React, { Component } from 'react'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'

import './home.scss'
class Home extends Component {
	render() {
		return (
			<div className="home-page">
				<div className="home-page__main">
					<span className="home-page__title">Browse posts</span>
					<PostForm />
					<PostList />
				</div>
			</div>
		)
	}
}

export default Home
