// contains queries and mutations for interacting with api and state

import { gql } from '@apollo/client'

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

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const POST_CONTENT = gql`
  mutation postContent($content: String!) {
    newContent(content: $content) {
      String
    }
  }
`