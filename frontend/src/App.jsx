import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'  
import Home from './pages/home'
import UserLogin from './pages/userlogin'
import UserSignUp from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import { UserDataContext } from './context/AuthContext'

const App = () => {
  const ans=useContext(UserDataContext)
  console.log(ans,"ans")

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/captain_login" element={<CaptainLogin/>} />
        <Route path="/captain_signup" element={<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App