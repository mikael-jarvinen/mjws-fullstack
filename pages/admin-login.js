import React, { useState, useEffect } from 'react'
import { Box, Button, Divider, Typography } from '@material-ui/core'
import { Form } from 'informed'
import TextInput from '../components/TextInput'
import { useLogin, useWho } from '../lib/contentService'
import { useRouter } from 'next/router'

const Login = () => {
  const [clientRender, setClientRender] = useState(false)
  const router = useRouter()
  const login = useLogin()
  const [whoami, updateWhoami] = useWho()

  useEffect(() => {
    setClientRender(true)
  })

  const handleSubmit = async ({ username, password}) => {
    await login({ username, password })
    updateWhoami()
  }

  const validateEmpty = value => {
    if (!value) {
      return 'Cannot be empty'
    }
  }

  if (!clientRender) {
    return null
  }

  // if logged in redirect to root
  if (whoami && whoami.username !== '') {
    router.push('/')
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