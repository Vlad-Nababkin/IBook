import { useState } from 'react'
import UserApi from '../../entities/user/UserApi'
import { useNavigate, useParams } from 'react-router'

export default function ResetPasswordPage() {
	const [password, setPassword] = useState('')
	const { token } = useParams()
	const navigate = useNavigate()

	const onSubmitHandler = async event => {
		event.preventDefault()

		try {
			const { statusCode, error } = await UserApi.resetPassword({
				token,
				password,
			})

			if (error) {
				alert(error)
				return
			}

			if (statusCode === 200) {
				alert('Password updated')
				navigate('/login')
			}
		} catch (error) {
			console.log(error)
			alert(error.message)
		}
	}

	return (
		<form onSubmit={onSubmitHandler}>
			<input
				type='password'
				name='password'
				placeholder='New Password'
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>
			<button type='submit'>Reset Password</button>
		</form>
	)
}
