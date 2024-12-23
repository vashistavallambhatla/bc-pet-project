import { useEffect, useState } from 'react'
import './App.css'
import SignUp from '../auth/signup'
import SignIn from '../auth/login'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ForgotPassword from '../auth/forgotPassword'
import { useRecoilValue } from 'recoil'
import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/navbar'
import HomePage from '../pages/homePage'
import Profile from '../pages/profile'
import { authState } from '../atoms/authAtom'
import { AuthRoutes } from '../utils/protectedRoutes'
import useAuthListener from '../hooks/useAuthListener'
import { userState } from '../atoms/state/userAtom'

function App() {
  const user = useRecoilValue(userState)

  useAuthListener();
  console.log(`Main log : ${user}`);
  
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route element={<AuthRoutes/>}>
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={"/forgotPassword"} element={<ForgotPassword/>}/>
          </Route>
          <Route path={"/profile"} element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  )
}


export default App
