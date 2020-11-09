import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button
} from '@material-ui/core'
import { useWho, useLogout } from '../lib/contentService'

const TopBar = () => {
  const [whoami, updateWhoami] = useWho()
  const logout = useLogout()

  const handleLogout = () => {
    logout()
    updateWhoami()
  }

  if (!whoami || whoami.username === '') {
    return null
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          {whoami && whoami.username !== '' ?
            <Box display='flex' flexGrow={1}>
              <Box
                display='flex'
                flexGrow={1}
                justifyContent='center'
              >
                <Typography variant='h6'>Logged in as {whoami.username}</Typography>
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