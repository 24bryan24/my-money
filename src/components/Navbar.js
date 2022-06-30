import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'


export default function Navbar() {

  const { isLoggedIn, isFirstTime, name } = useAuthContext()
  const { logMeOut } = useLogout()

  return (
    <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}><Link to='/'>myMoney</Link></li>
          {isLoggedIn && <p>- - -  {isFirstTime ? 'Hello there, ' : 'Welcome back, '}{name} - - -</p>}
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>SignUp</Link></li>
          {isLoggedIn && <li className='btn-nav'><Link onClick={logMeOut} to='/'>Logout</Link></li>}
        </ul>
    </nav>
  )
}
