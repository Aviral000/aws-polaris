import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import TaskPage from './pages/TaskPage'
import AddTask from './pages/AddTask'
import ViewTaskModal from './components/ViewTaskModel'
import EditTaskModal from './components/EditTaskModel'

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/login' Component={Login} />
          <Route path='/task' Component={TaskPage} />
          <Route path='/add-task' Component={AddTask} />
          <Route path='/view-task/:id' Component={ViewTaskModal} />
          <Route path='/edit-task/:id' Component={EditTaskModal} />
        </Routes>
      </Router>
    </div>
  )
}
