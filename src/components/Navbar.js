import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { authorizeProject } from '../firebase/config'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'
import ProfilePopUp from './ProfilePopUp';

export default function Navbar() {

  // const [isDoneRendered, setIsDoneRendered] = useState(false)
  const { user: isLoggedIn, isFirstTime, name, login, logout, togglePopUp, changeCopyName, authIsReady, profilePopUpOpen } = useAuthContext()
  const { logMeOut } = useLogout()

  useEffect(async () => {
    await authorizeProject.onAuthStateChanged(user => {
  if (user) {
    login(user)
    // console.log(user)
  } else {
    logout()
  }
  // setIsDoneRendered(true)
});
  },[])

  // const handleLogOut = () => {
  //   logMeOut()
  //   setIsDoneRendered(true)
  // }

  console.log(isLoggedIn)

  const handleClick = () => {
      changeCopyName(name)
      togglePopUp('profile')
  }

  return (
    <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}><Link to='/'>myMoney</Link></li>
          {authIsReady && 
          (isLoggedIn ?
          <>
            <p>- - -  {isFirstTime ? 'Hello there, ' : 'Welcome back, '}{name} - - -</p>
            <li><button className='btn' onClick={logMeOut}>Logout</button></li>
            <button onClick={handleClick}>Edit</button>
          </> :
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>SignUp</Link></li>
          </>
          )
          }
          {profilePopUpOpen && <ProfilePopUp popup='profile' />}
        </ul>
    </nav>
  )
}
