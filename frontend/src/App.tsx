import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import About from './pages/About'
import TaskPage from './pages/TaskPage'
import AddTask from './pages/AddTask'

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/login' Component={Login} />
          <Route path='/about' Component={About} />
          <Route path='/task' Component={TaskPage} />
          <Route path='/add-task' Component={AddTask} />
        </Routes>
      </Router>
    </div>
  )
}
