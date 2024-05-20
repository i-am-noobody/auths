import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App