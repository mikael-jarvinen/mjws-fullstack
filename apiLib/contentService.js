import strings from '../content-strings.json'
let content = strings
import fs from 'fs'

export const getContent = () => {
  return content
}

export const newContent = data => {
  const stringContent = JSON.stringify(
    {
      content: data
    }
  )

  fs.writeFile('./content-strings.json', stringContent, (err) => {
    if (err) {
      console.log(`Couldn't write new content to file: ${err}`)
      throw new Error('Couldn\'t write new content to file')
    } else {
      content = { content: data }
    }
  })

  return data
}