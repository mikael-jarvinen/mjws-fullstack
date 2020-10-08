import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

let uri = '/graphql'
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:4000/graphql'
}

const httpLink = createHttpLink({ uri })

const authLink = setContext((_, { headers }) => {
  let token = ''
  if (process.browser) {
    token = localStorage.getItem('apiToken')
  }

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

client.query({
  query: gql`
    query {ping}
  `
}).then(result => 
  console.log('Backend responded with', result.data.ping))

export default client