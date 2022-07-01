import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authorizeProject } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'


export default function Navbar() {

  const { isLoggedIn, isFirstTime, name, login } = useAuthContext()
  const { logMeOut } = useLogout()

  useEffect(async () => {
    await authorizeProject.onAuthStateChanged(user => {
  if (user) {
    login(user)
    console.log(user)
  } else {
  }
});
  },[])

  return (
    <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}><Link to='/'>myMoney</Link></li>
          {isLoggedIn ?
          <>
            <p>- - -  {isFirstTime ? 'Hello there, ' : 'Welcome back, '}{name} - - -</p>
            <li className={styles['btn-nav']}><Link onClick={logMeOut} to='/'>Logout</Link></li>
          </> :
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>SignUp</Link></li>
          </>
          }
        </ul>
    </nav>
  )
}
