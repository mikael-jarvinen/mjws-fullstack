import React from 'react'
import { Route } from 'wouter'
import Home from './views/Home'
import Login from './views/Login'
import TopBar from './components/TopBar'

const App = () => {
  return (
    <>
      <Route path='/admin-login' component={Login}/>
      <Route path='/'>
        <TopBar/>
        <Home/>
      </Route>
    </>
  )
}

export default App