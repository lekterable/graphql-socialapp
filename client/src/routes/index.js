import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './index.scss'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Header />
					<Switch>
						<Route component={Home} />
					</Switch>
					<Footer content={'Made with ♥ by github.com/lekterable'} />
				</div>
			</Router>
		)
	}
}

export default App
