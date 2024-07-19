import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import About from './pages/About'


export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}
