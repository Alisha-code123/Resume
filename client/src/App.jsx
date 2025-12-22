import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Layout from './assets/pages/Layout'
import Dashboard from './assets/pages/Dashboard'
import ResumeBuilder from './assets/pages/ResumeBuilder'
import Preview from './assets/pages/Preview'
import Login from './assets/pages/Login'

const App = () => {
  return (
<>
<Routes>
  <Route path='/' element={<Home/>}/>

  <Route path='app' element={<Layout/>}>
   <Route index element={<Dashboard/>}/>
   <Route path="builder/:resumeId" element={<ResumeBuilder/>}/>
 </Route>

 <Route path='view/:resumeId' element={<Preview/>}/>
 <Route path='login' element={<Login/>}/>
 
</Routes>
</>
  )
}

export default App

