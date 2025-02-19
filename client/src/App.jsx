import { BrowserRouter, Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'

import RegPage from './pages/RegPage/RegPage';



function App() {
  const [user, setUser] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage setUser={setUser} />} />
    <Route path='/reg' element={<RegPage setUser={setUser} />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
