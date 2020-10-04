import React from 'react'
import backgroundImg from '../assets/images/background.png'
import { Box } from '@material-ui/core'

const Background = () => {
  return (
    <Box
      position='relative'
      display='flex'
      justifyContent='center'
    >
      <img src={backgroundImg} alt='background'/>
      <Box
        flexGrow={1}
        color='white'
        position='absolute'
        top='50%'
        textAlign='center'
      >
        <h1>M.J. Web&Software</h1>
        <p>Webpalvelut ja ohjelmistot</p>
      </Box>
    </Box>
  )
}

export default Background