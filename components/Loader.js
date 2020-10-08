import React from 'react'
import { PacmanLoader } from 'react-spinners'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'

const Loader = ({ size }) => {
  return (
    <Box
      display='flex'
      flexGrow={1}
      justifyContent='center'
      marginTop={20}
    >
      <PacmanLoader size={size}/>
    </Box>
  )
}

Loader.propTypes = {
  size: PropTypes.number
}

export default Loader