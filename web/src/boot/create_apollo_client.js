import { ApolloClient, createNetworkInterface } from 'react-apollo'

export default function () {
  return new ApolloClient({
    networkInterface: createNetworkInterface({uri: 'http://127.0.0.1:3000/graphql'}),
    addTypename: true,
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) {
        return result.__typename + result.id
      }
      return null
    },
  })
}
