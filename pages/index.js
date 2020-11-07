import React, { useState } from 'react'
import { Box, Container, Switch, Button } from '@material-ui/core'
import { Parallax, Background as BackgroundParallax } from 'react-parallax'
import Background from '../components/Background'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import MDEditor from '@uiw/react-md-editor'
import TopBar from '../components/TopBar'
import Footer from 'react-footer-comp'
import { useContent, useWho } from '../lib/contentService'
import { getContent } from '../apiLib/contentService'

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
  const [editContent, setEditContent] = useState(false)
  const [newContent, setNewContent] = useState('')
  const [content, setContent] = useContent(initialContent)
  const [whoami] = useWho()
  
  const parseHtml = htmlParser({
    isValidNode: node => node.type !== 'script',
  })

  const toggleEditContent = () => {
    setEditContent(!editContent)
    setNewContent(content)
  }

  const saveNewContent = () => {
    setContent(newContent)
  }
  console.log(whoami)

  return (
    <Box>
      <TopBar/>
      <Parallax strength={2500}>
        <Box marginTop={50} marginBottom={3}>
          <Container>
            <Box
              bgcolor='white'
              borderRadius={25}
              padding='5%'
              boxShadow={20}
              border='1px solid lightgrey'
            >
              {whoami && whoami.id ?
                <Box
                  display='flex'
                  flexDirection='row-reverse'
                  alignItems='center'
                >
                  <Switch
                    checked={editContent}
                    onChange={toggleEditContent}
                  />
                  Edit content
                  {editContent ?
                    <Box
                      flexGrow={1}
                      justifyContent='center'
                      display='flex'
                    >
                      <Button variant='outlined' onClick={saveNewContent}>
                        Save content
                      </Button>
                    </Box>: null}
                </Box> : null}
              {editContent ?
                <MDEditor
                  value={newContent}
                  onChange={setNewContent}/> :
                <ReactMarkdown
                  astPlugins={[parseHtml]}
                  source={content}
                  escapeHtml={false}
                />}
            </Box>
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