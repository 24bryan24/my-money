import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Login.module.css'
import { firestoreProject } from '../../firebase/config'
import { useLogin } from '../../hooks/useLogin'
import PasswordPopUp from '../../components/PasswordPopUp';
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { logMeIn, isPending, error } = useLogin()
  const { passwordPopUpOpen, togglePopUp } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await logMeIn(username, password)
    if(!error) {
      history.push('/')
    }
    // console.log(error)
    // await firestoreProject.collection('users').get().then(snapshot => {
    //   if(snapshot.empty) return 'No users currently in the database'
    //   snapshot.docs.forEach(doc => {
    //     if(doc.data().username === username && doc.data().password === password) {
    //         console.log('this is from the firebase database!', doc.data())
    //         history.push('/')
    //     }
    //   }
    //     )

    // })
  }

  const handleReset = () => {
    togglePopUp('password')
  }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          <span>Username:</span>
          <input 
              value={username}
              placeholder='example@domain.com'
              type='email'
              onChange={(e) => setUsername(e.target.value)}
              required
              />
        </label>
        <label>
          <span>Password:</span>
          <input 
              value={password}
              placeholder='abc123!$'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
              />
        </label>
        {isPending ? <button className='btn' disabled >Loading...</button> : <button className='btn'>Login</button>}
        {error && <p>{error}</p>}
        <button onClick={handleReset}>Reset Password</button>
        {passwordPopUpOpen && <PasswordPopUp username={username} setUsername={setUsername} />}
    </form>
  )
}
