import Nav from '../Nav/Nav'
import {Outlet} from 'react-router'

export default function Layout({user, setUser}) {
  return (
		<div>
			<Nav user={user} setUser={setUser} />
			<Outlet />
		</div>
	)
}