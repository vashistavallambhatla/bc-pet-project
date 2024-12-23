import { useEffect, useState } from 'react'
import './App.css'
import SignUp from '../auth/signup'
import SignIn from '../auth/login'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ForgotPassword from '../auth/forgotPassword'
import { RecoilRoot, useRecoilState } from 'recoil'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/navbar'
import HomePage from '../pages/homePage'
import Profile from '../pages/profile'
import { authState } from '../atoms/authAtom'

function App() {
  const [auth,setAuth] = useRecoilState(authState)

  useEffect(()=>{
    const localStorageAuth = localStorage.getItem("authState")
    if(localStorageAuth){
      const authData = JSON.parse(localStorageAuth)
      setAuth({isAuthenticated : true,user : authData.user})
    }
  },[])
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/signin"} element={<SignIn/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
          <Route path={"/profile"} element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  )
}


export default App
