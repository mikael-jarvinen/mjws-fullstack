import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'

const Background = () => {
  return (
    <Box
      position='relative'
      display='flex'
      justifyContent='center'
    >
      <img src='/background.png' alt='background'/>
      <Box
        flexGrow={1}
        color='white'
        position='absolute'
        top='50%'
        textAlign='center'
      >
        <Typography variant='h2'>M.J. Web&Software</Typography>
        <Divider/>
        <Typography variant='body1'>Räätälöidyt webpalvelut ja ohjelmistot</Typography>
      </Box>
    </Box>
  )
}

export default Background