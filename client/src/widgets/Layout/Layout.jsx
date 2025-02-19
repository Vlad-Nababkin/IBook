import Nav from '../Nav/Nav'
import {Outlet} from 'react-router'

export default function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}