import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home.jsx'
import getCurrentUser from './customHooks/getCurrentUser.js'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile.jsx'
import UploadPdf from './pages/UoloadPdf.jsx'
import getAllPdfs from './customHooks/getAllPddfs.js'
import AllPdfs from './pages/AllPdfs.jsx'
import SearchPdf from './pages/SearchPdfs.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import getCurrentUserUploads from './customHooks/getCurrentUserUploads.js'
import MyUploads from './pages/MyUploads.jsx'
import EditPdf from './pages/EditPdf.jsx'


function App() {
  getCurrentUser();
  getAllPdfs();
  getCurrentUserUploads();
  const {userData}=useSelector((state)=>state.user)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to='/' />}  />
        <Route path='/login' element={!userData ? <Login/> : <Navigate to='/' />}  />
        <Route path='/profile' element={userData ? <Profile/> : <Navigate to='/login'/>} />
        <Route path="/upload" element={userData ? <UploadPdf/> : <Navigate to='/login'/>} />
        <Route path="/allpdfs" element={userData ? <AllPdfs/> : <Navigate to='/login'/>} />
        <Route path="/search" element={userData ? <SearchPdf/> : <Navigate to='/login'/>} />
        <Route path="/change-password" element={userData ? <ChangePassword/> : <Navigate to='/login'/>} />
        <Route path="/my-uploads" element={userData ? <MyUploads/> : <Navigate to='/login'/>} />
        <Route path="/edit-pdf/:id" element={userData ? <EditPdf/>  : <Navigate to='/login'/>} />
      </Routes>


      <Toaster  position='top-right'/>
    </>
  )
}

export default App
