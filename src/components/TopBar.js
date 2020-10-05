import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useQuery, useApolloClient } from '@apollo/client'
import { WHOAMI } from '../api'

const TopBar = () => {
  const {data} = useQuery(WHOAMI)
  const client = useApolloClient()

  if (data && data.whoami) {
    console.log(data.whoami)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    client.writeQuery({
      query: WHOAMI,
      data: {
        whoami: {
          __ref: ''
        }
      }
    })
  }


  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge='start' aria-label='menu'>
            <Box color='white'>
              <MenuIcon color='inherit'/>
            </Box>
          </IconButton>
          {data && data.whoami.username !== '' ?
            <Box display='flex' flexGrow={1}>
              <Box
                display='flex'
                flexGrow={1}
                justifyContent='center'
              >
                <Typography variant='h6'>Logged in as {data.whoami.username}</Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='row-reverse'
                color='white'
              >
                <Button
                  color='inherit'
                  onClick={handleLogout}
                  variant='outlined'
                >
              logout
                </Button>
              </Box>
            </Box>
            : null}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
  // we are rendering an empty toolbar after app bar, so that
  // we wont render any items behind appbar
}

export default TopBar