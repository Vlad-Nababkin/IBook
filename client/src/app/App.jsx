import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "../widgets/Layout/Layout"
import LoginPage from '../pages/LoginPage/LoginPage'
import RegPage from '../pages/RegPage/RegPage';
import { useEffect, useState } from "react";
import UserApi from "../entities/user/UserApi";
import { setAccessToken } from "../shared/lib/axiosinstance";


export default function App() {
  const [ user, setUser ] = useState(null)


  useEffect(() => {
    UserApi.refreshTokens().then(console.log)
    UserApi.refreshTokens().then(({error, data, statusCode}) => {
      if(error) {
        setUser(null)
        return
      }
      if(statusCode === 200) {
        setUser(data.user)
        setAccessToken(data.accessToken)
      }
    })
  }, [])

  return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout user={user} setUser={setUser} />}>
					<Route path='/login' element={<LoginPage setUser={setUser} />} />
					<Route path='/reg' element={<RegPage setUser={setUser} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
