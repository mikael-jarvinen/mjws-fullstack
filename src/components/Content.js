import React from 'react'

const content = () => {
  let strings = []
  for (let x = 0; x < 80; x++) {
    strings = strings.concat(`${x + 1}. Hello there!`)
  }

  return (
    <>
      {strings.map(s => <p key={s}>{s}</p>)}
    </>
  )
}

export default content