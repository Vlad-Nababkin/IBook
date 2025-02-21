
import { BrowserRouter, Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import Layout from '../widgets/Layout/Layout'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegPage from '../pages/RegPage/RegPage'
import BooksPage from '../pages/BooksPage/BooksPage'
import UserApi from '../entities/user/UserApi'
import { setAccessToken } from '../shared/lib/axiosinstance'
import MainPage from '../pages/MainPage/MainPage'

// import OneBookPage from "../pages/OneBookPage/OneBookPage";

export default function App() {
	// следим за юзером(пробрасываем в автор и регу)
	const [user, setUser] = useState(null)


	// обновляем токены
	useEffect(() => {
		UserApi.refreshToken().then(console.log)
		UserApi.refreshToken()
			.then(({ error, data, statusCode }) => {
				if (error) {
					setUser(null)
					return
				}
				if (statusCode === 200) {
					setUser(data.user)
					setAccessToken(data.accessToken)
				}
			})
			.catch(({ message }) => {
				console.log(message)
			})
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout user={user} setUser={setUser} />} >
          <Route path='/' element={<MainPage />} />
					<Route path='/reg' element={<RegPage setUser={setUser} />} />
					<Route path='/login' element={<LoginPage setUser={setUser} />} />
					<Route path='/books' element={<BooksPage />} />
             <Route path='/books/:id' element={<OneBookPage  />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)

}
