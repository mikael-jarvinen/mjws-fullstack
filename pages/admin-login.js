import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../libs/queries'
import { Box, Button, Divider, Typography } from '@material-ui/core'
import { Form } from 'informed'
import TextInput from '../components/TextInput'
import { useRouter } from 'next/router'

const Login = () => {
  const [clientRender, setClientRender] = useState(false)
  const [login, { data }] = useLazyQuery(LOGIN)
  const router = useRouter()

  useEffect(() => {
    setClientRender(true)
  })

  const handleSubmit = ({ username, password}) => {
    login({ variables: { username, password } })
  }

  if (data) {
    document.cookie = 'signedin=true'
    window.localStorage.setItem('apiToken', data.login)
    router.push('/')
  }

  const validateEmpty = value => {
    if (!value) {
      return 'Cannot be empty'
    }
  }

  if (!clientRender) {
    return null
  }

  return (
    <Box
      position='absolute'
      left='50%'
      top='50%'
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Box
        padding={4}
        border='1px solid lightgrey'
        borderRadius={15}
        boxShadow={20}
        textAlign='center'
      >
        <Form onSubmit={handleSubmit}>
          <Typography variant='h5'>Login</Typography>
          <Divider/>
          <Box display='flex' justifyContent='center'>
            <Box>
              <Box padding={1}>
                <label>
                  <Typography variant='body1'>
                    username
                  </Typography>
                  <TextInput field='username' validate={validateEmpty}/>
                </label>
              </Box>
              <Box padding={1}>
                <label>
                  <Typography variant='body1'>
                    password
                  </Typography>
                  <TextInput field='password' type='password' validate={validateEmpty}/>
                </label>
              </Box>
              <Button variant='outlined' type='submit'>login</Button>
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default Login