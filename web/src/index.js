import loadStyles from './boot/load_styles'
import mountApp from './boot/mount_app'
import createApolloClient from './boot/create_apollo_client'
import provideApollo from './boot/provide_apollo'

import Routes from './routes'

loadStyles()
const apolloClient = createApolloClient()
const App = provideApollo(apolloClient)(Routes)
mountApp(App)