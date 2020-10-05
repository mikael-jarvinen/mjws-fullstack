import React from 'react'
import { Box, Container } from '@material-ui/core'
import { Parallax, Background as BackgroundParallax } from 'react-parallax'
import Background from '../components/Background'
import { useQuery } from '@apollo/client'
import { GET_CONTENT } from '../api'
import Loader from '../components/Loader'

const Home = () => {
  const { loading, error, data } = useQuery(GET_CONTENT)
  
  if (loading) {
    return <Loader size={100}/>
  }

  if (error) {
    return <h1>Something went wrong, failed to load content from API :(</h1>
  }

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
              {data.content}
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