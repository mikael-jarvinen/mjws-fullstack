import React, { useState } from 'react'
import { Box, Container, Switch, Button } from '@material-ui/core'
import { Parallax, Background as BackgroundParallax } from 'react-parallax'
import Background from '../components/Background'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { HOME_PAGE, POST_CONTENT } from '../lib/queries'
import Loader from '../components/Loader'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import MDEditor from '@uiw/react-md-editor'
import TopBar from '../components/TopBar'
import Footer from 'react-footer-comp'
import { withApollo } from '../lib/apollo'

const IndexPage = () => {
  const [editContent, setEditContent] = useState(false)
  const [newContent, setNewContent] = useState('')
  const { loading, error, data } = useQuery(HOME_PAGE)
  const [saveContent] = useMutation(POST_CONTENT)
  
  const parseHtml = htmlParser({
    isValidNode: node => node.type !== 'script',
  })

  if (loading) {	
    return <Loader size={100}/>
  }

  if (error) {
    return <h1>Something went wrong, failed to load content from API :(</h1>
  }

  const toggleEditContent = () => {
    setEditContent(!editContent)
    setNewContent(data.content)
  }

  const saveNewContent = () => {
    saveContent({
      variables: {
        content: newContent
      }
    })
  }

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
              {data.whoami.id ?
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
                  source={data.content}
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

export default withApollo({ ssr: true })(IndexPage)