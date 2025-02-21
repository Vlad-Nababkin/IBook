import { useState } from 'react'
import UserApi from '../../entities/user/UserApi'
import { useNavigate } from 'react-router'

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const onSubmitHandler = async event => {
		event.preventDefault()

		try {
			const { statusCode, error } = await UserApi.forgotPassword({
				email,
			})

			if (error) {
				alert(error)
				return
			}

			if (statusCode === 200) {
				alert('Reset email sent')
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
				type='email'
				name='email'
				placeholder='Email'
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>
			<button type='submit'>Send</button>
		</form>
	)
}
