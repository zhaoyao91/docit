import React from 'react'
import { ApolloProvider } from 'react-apollo'

export default function (apolloClient) {
  return function (Component) {
    return (props) => (
      <ApolloProvider client={apolloClient}>
        <Component {...props}/>
      </ApolloProvider>
    )
  }
}