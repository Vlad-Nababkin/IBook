
import {NavLink} from 'react-router'

export default function Nav() {
  // let navigate = useNavigate()
return (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/login'>Login</NavLink>
    <NavLink to='/reg'>Registration</NavLink>
    <NavLink to='/post'>Post</NavLink>
    <button type='submit'>Exit</button>
  </nav>
)
}