import ApolloClient from 'apollo-boost'
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { AUTH_TOKEN } from '../utils'
import Home from './Home'
import './index.scss'
import Login from './Login'
import Register from './Register'

const client = new ApolloClient({
  uri: 'graphql',
  request: operation => {
    const token = localStorage.getItem(AUTH_TOKEN)
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
