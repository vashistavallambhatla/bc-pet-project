import { useState } from 'react'
import './App.css'
import SignUp from '../auth/signup'
import SignIn from '../auth/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignIn/>
    </>
  )
}

export default App
