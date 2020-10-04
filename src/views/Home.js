import React from 'react'
import Content from '../components/Content'
import { Box, Container } from '@material-ui/core'
import { Parallax, Background as BackgroundParallax } from 'react-parallax'
import Background from '../components/Background'

const Home = () => {
  return (
    <> 
      <Parallax strength={2500}>
        <Box marginTop={70}>
          <Container>
            <Box
              bgcolor='white'
              borderRadius={25}
              padding={15}
              boxShadow={20}
              border='1px solid lightgrey'
            >
              <Content/>
            </Box>
          </Container>
        </Box>
        <BackgroundParallax>
          <Box marginTop={110} marginBottom={-1}>
            <Background/>
          </Box>
        </BackgroundParallax>
      </Parallax>
    </>
  )
}

export default Home