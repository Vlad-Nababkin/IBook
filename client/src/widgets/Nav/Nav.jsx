import { NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import UserApi from '../../entities/user/UserApi'
import Swal from 'sweetalert2'
import styles from './Nav.module.css'

export default function Nav({ user, setUser }) {
	let navigate = useNavigate()

	async function signOutHandler() {
		try {
			const result = await Swal.fire({
				title: 'Вы уверены?',
				text: 'Это действие нельзя отменить!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Да, выйти',
				cancelButtonText: 'Отмена',
			})
			if (result.isConfirmed) {
				const { statusCode, message, error } = await UserApi.signOut()

				if (error) {
					return Swal.fire('Ошибка!', error, 'error')
				}

				if (statusCode === 200) {
					Swal.fire('Готово!', message, 'success')
					setUser(null)
					navigate('/')
				}
			}
		} catch ({ message }) {
			console.error('Ошибка выхода:', message)
			Swal.fire('Ошибка!', 'Не удалось выйти. Попробуйте снова.', 'error')
		}
	}
	return (
		<nav>
			<NavLink
				to='/'
				className={({ isActive }) => (isActive ? styles.active : '')}
			>
				Home
			</NavLink>
			{!user && (
				<>
					<NavLink
						to='/login'
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						Login
					</NavLink>
					<NavLink
						to='/reg'
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						Registration
					</NavLink>
				</>
			)}
			{user && (
				<>
					<span>Привет {user.username}</span>
					<NavLink
						to='/books'
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						Books
					</NavLink>
			<button type='submit' onClick={signOutHandler}>
				Exit
			</button>
				</>
			)}

		</nav>
	)
}
