import { gql } from 'apollo-server-micro'

const typeDefs = gql`
type Query {
  ping: String
  login(
    username: String!
    password: String!
  ): String!
  whoami: User
  content: String!
}

type User {
  username: String!
  id: ID!
}

type Mutation {
  newContent(
    content: String!
  ): String!
  contact(
    email: String!
    name: String!,
    message: String!
  ): String!
}
`

export default typeDefs