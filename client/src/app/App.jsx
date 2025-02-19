import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "../widgets/Layout/Layout"
import LoginPage from '../pages/LoginPage/LoginPage'
import RegPage from '../pages/RegPage/RegPage';


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<LoginPage  />} />
        <Route path='/reg' element={<RegPage  />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
