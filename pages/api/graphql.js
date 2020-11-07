import { ApolloServer } from 'apollo-server-micro'
import typeDefs from '../../apiLib/typeDefs'
import resolvers from '../../apiLib/resolvers'
import context from '../../apiLib/context'

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })