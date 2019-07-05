import ApolloClient from 'apollo-boost'
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import auth from '../../utils/auth'
import Footer from '../Footer'
import Header from '../Header'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import './index.scss'

const client = new ApolloClient({
  uri: 'graphql',
  clientState: {
    defaults: {
      isAuthorized: auth.isAuthorized
    },
    resolvers: {
      Query: {
        isAuthorized: () => auth.isAuthorized
      },
      Mutation: {
        logout: (_, __, { client }) => {
          auth.clear()
          client.resetStore()
        }
      }
    }
  },
  onError: ({ graphQLErrors }) => {
    console.log(graphQLErrors)
  },
  request: operation => {
    if (auth.isAuthorized)
      operation.setContext({
        headers: {
          authorization: `Bearer ${auth.token}`
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
