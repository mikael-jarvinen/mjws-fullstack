import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import {
  HOME_PAGE,
  POST_CONTENT,
  WHOAMI,
  CONTACT,
  LOGIN
} from './queries'

let uri = 'https://mjsoftware.fi/api/graphql'

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:3000/api/graphql'
}

export const URI = uri

let token = ''
// eslint-disable-next-line no-undef
if (process.browser) {
  token = localStorage.getItem('apiToken')
}

let client = new GraphQLClient(uri, {
  headers: {
    authorization: token
  }
})

export const getContent = async () => await client.request(HOME_PAGE)

export const updateContent = async content => await client.request(POST_CONTENT, { content })

export const useLogin = () => {
  const login = async variables => {
    try {
      const response = await client.request(LOGIN, variables)
      document.cookie = 'signedin=true'
      window.localStorage.setItem('apiToken', response.login)
      client = new GraphQLClient(uri, {
        headers: {
          authorization: response.login
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return login
}

export const useLogout = () => {
  return () => {
    localStorage.clear()
    client = new GraphQLClient(uri)
  }
}

export const useContent = initialContent => {
  const [content, setContent] = useState(initialContent)

  const sendNewContent = async newContent => {
    await updateContent(newContent)
    setContent(newContent)
  }

  return [
    content,
    sendNewContent
  ]
}

export const useWho = () => {
  const [whoami, setWhoami] = useState(null)

  const updateWhoami = async () => {
    const response = await client.request(WHOAMI)
    setWhoami(response.whoami)
  }

  useEffect(() => {
    updateWhoami()
  }, [])

  return [
    whoami,
    updateWhoami
  ]
}

export const useContactSend = () => {
  const sendContact = async variables => {
    await client.request(CONTACT, variables)
  }

  return sendContact
}