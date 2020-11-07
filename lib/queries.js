// contains queries and mutations for interacting with api and state

import { gql } from 'graphql-request'

export const WHOAMI = gql`
  query {
    whoami {
      username
      id
    }
  }
`

export const GET_CONTENT = gql`
  query {content}
`

export const HOME_PAGE = gql`
  query {
    content
    whoami {
      username
      id
    }
  }
`

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const POST_CONTENT = gql`
  mutation postContent($content: String!) {
    newContent(content: $content)
  }
`

export const CONTACT = gql`
  mutation contact($email: String!, $name: String!, $message: String!) {
    contact(email: $email, name: $name, message: $message)
  }
`