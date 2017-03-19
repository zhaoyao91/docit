import { ApolloClient, createNetworkInterface } from 'react-apollo'

export default function () {
  return new ApolloClient({
    networkInterface: createNetworkInterface({uri: 'http://127.0.0.1:3000/graphql'}),
  })
}
