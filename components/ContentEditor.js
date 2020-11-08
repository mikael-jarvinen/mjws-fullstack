import React from 'react'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import htmlParser from 'react-markdown/plugins/html-parser'
import 'react-markdown-editor-lite/lib/index.css'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

const ContentEditor = ({ value, onChange }) => {
  const parseHtml = htmlParser({
    isValidNode: node => node.type !== 'script',
  })

  const handleChange = ({ text }) => {
    onChange(text)
  }

  return (
    <>
      <MdEditor
        value={value}
        onChange={handleChange}
        iconsSet='font-awesome'
        config={{
          canView: {
            html: false
          }
        }}
      />
      <ReactMarkdown
        astPlugins={[parseHtml]}
        source={value}
        escapeHtml={false}
      />
    </>
  )
}

export default ContentEditor