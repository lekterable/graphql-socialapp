import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './index.scss'

const client = new ApolloClient({
  uri: 'graphql',
  request: operation => {
    const token = localStorage.getItem('token')
    if (token)
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  }
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
              <Route exact path="/login" component={Login} />
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
