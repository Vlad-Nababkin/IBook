import { BrowserRouter, Route, Routes } from 'react-router'
import { useState, useEffect } from 'react'
// import MainPage from './pages/MainPage/MainPage';
// import TasksPage from './pages/TasksPage/TasksPage';
// import TestPage from './pages/TestPage/TestPage';
// import Layout from './widgets/Layout/Layout';
// import BooksPage from './pages/BooksPage/BooksPage';
import LoginPage from './pages/LoginPage/LoginPage'
// import OneBook from './pages/OneBookPage/OneBookPage';
import RegPage from './pages/RegPage/RegPage';
// import { setAccessToken } from './shared/lib/axiosinstance'
// import UserApi from './entities/user/UserApi'


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
