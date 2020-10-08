import React, { useState, useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Box } from '@material-ui/core'
import PropTypes from 'prop-types'

const Loader = ({ size }) => {
  const [renderClient, setRenderClient] = useState(false)

  useEffect(() => {
    setRenderClient(true)
  })

  return (
    <Box
      display='flex'
      flexGrow={1}
      justifyContent='center'
      marginTop={20}
      suppressHydrationWarning
    >
      {renderClient && <PacmanLoader size={size}/>}
    </Box>
  )
}

Loader.propTypes = {
  size: PropTypes.number
}

export default Loader