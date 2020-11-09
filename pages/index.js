import React from 'react'
import { Box, Container } from '@material-ui/core'
import { Parallax, Background as BackgroundParallax } from 'react-parallax'
import Background from '../components/Background'
import Content from '../components/Content'
import Footer from 'react-footer-comp'
import { getContent } from '../apiLib/contentService'
import ContactButton from '../components/ContactButton'
import TopBar from '../components/TopBar'

export const getStaticProps = async () => {
  const response = getContent()

  return {
    props: {
      initialContent: response.content
    },
    revalidate: 1
  }
}

const IndexPage = ({ initialContent }) => {
  return (
    <Box>
      <TopBar/>
      <ContactButton/>
      <Parallax strength={2500}>
        <Box marginTop={50} marginBottom={3}>
          <Container>
            <Content initialContent={initialContent}/>
          </Container>
        </Box>
        <BackgroundParallax>
          <Box marginTop={110} marginBottom={-1}>
            <Background/>
          </Box>
        </BackgroundParallax>
      </Parallax>
      <Footer
        text='All rights reserved'
        copyrightIcon
        copyrightText
        bgColor='black'
      />
    </Box>
  )
}

export default IndexPage