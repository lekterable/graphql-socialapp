import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './index.scss'

const client = new ApolloClient({
	uri: 'graphql'
})

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<div className="container">
						<Header />
						<Switch>
							<Route exact path="/register" component={Register} />
							<Route component={Home} />
						</Switch>
						<Footer content={'Made with ♥ by github.com/lekterable'} />
					</div>
				</Router>
			</ApolloProvider>
		)
	}
}

export default App
