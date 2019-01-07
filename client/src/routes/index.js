import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Switch>
						<Route component={Home} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App
