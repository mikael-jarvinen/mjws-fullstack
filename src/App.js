import React from 'react'
import { Route } from 'wouter'
import Home from './views/Home'
import TopBar from './components/TopBar'

const App = () => {
  return (
    <>
      <TopBar/>
      <Route path='/' component={Home}/>
    </>
  )
}

export default App