import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const TopBar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge='start' aria-label='menu'>
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  )
  // we are rendering an empty toolbar after app bar, so that
  // we wont render any items behind appbar
}

export default TopBar