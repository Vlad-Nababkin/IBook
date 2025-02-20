import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "../widgets/Layout/Layout"
import LoginPage from '../pages/LoginPage/LoginPage'
import RegPage from '../pages/RegPage/RegPage';
import BooksPage from "../pages/BooksPage/BooksPage";
import { useEffect, useState } from "react";
import UserApi from "../entities/user/UserApi";
import { setAccessToken } from "../shared/lib/axiosinstance";
// import OneBookPage from "../pages/OneBookPage/OneBookPage";


function App() {

// следим за юзером(пробрасываем в автор и регу)
const [user, setUser] = useState(null)

// обновляем токены
useEffect(() => {
  
  UserApi.refreshTokens()
    .then(({ error, data, statusCode, message }) => {
      console.log('===>>успешный refreshTokens из бэка от UserApi.refreshTokens, data:',data);
      if (error) {
        // сбрасываем юзера
        setUser(null);
        return;
      }
      if (statusCode === 200) {
        setUser(data.user);
        // добавляем перехватчика (перезапись токена)
        setAccessToken(data.accessToken);
      }
    })
    .catch(({ message }) => {
      console.log(message);
    });
}, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<LoginPage  />} />
        <Route path='/reg' element={<RegPage  />} />
        <Route path='/books' element={<BooksPage  />} />
        {/* <Route path='/books/:id' element={<OneBookPage  />} /> */}

      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
