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
import ProductPage from '../pages/productPage'
import { theme } from './commonStyles'
import { ThemeProvider } from '@mui/material/styles';
import Cart from '../pages/cart'
import Collections from '../pages/collections'
import CheckOut from '../pages/checkout'

function App() {
  const user = useRecoilValue(userState)

  useAuthListener();
  console.log(`Main log : ${user?.id}`);
  
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
          <Route path={"/product/:productId"} element={<ProductPage/>}/>
          <Route path={"/cart"} element={<Cart/>}/>
          <Route path={"/collections/:collection"} element={<Collections/>}/>
          <Route path={"/checkout"} element={<CheckOut/>}/>
        </Routes>
      </Router>
    </>
  )
}


export default App
