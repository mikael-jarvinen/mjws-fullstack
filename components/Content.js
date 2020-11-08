import React, { useState } from 'react'
import ContentEditor from '../components/ContentEditor'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import { Box, Switch, Button } from '@material-ui/core'
import { useContent, useWho } from '../lib/contentService'

const Content = ({ initialContent }) => {
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

  return (
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
        <ContentEditor
          value={newContent}
          onChange={setNewContent}
        /> :
        <ReactMarkdown
          astPlugins={[parseHtml]}
          source={content}
          escapeHtml={false}
        />}
    </Box>
  )
}

export default Content