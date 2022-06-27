import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './SignUp.module.css'
import { useSignUp } from '../../hooks/useSignUp'
// import { firestoreProject } from '../../firebase/config'


export default function SignUp() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { signup, isPending, error } = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault()
    signup(username, password, name)
    // const data = {
    //   name,
    //   username,
    //   password
    // }
    // await firestoreProject.collection('users').add(data)
    // history.push('/')
  }

  console.log(username, password)

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <label>
          <span>Display Name:</span>
          <input 
              value={name}
              placeholder='Derek Sanders'
              type='text'
              onChange={(e) => setName(e.target.value)}
              required
              />
        </label>
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
        {isPending ? <button className='btn' disabled >Loading...</button> : <button className='btn'>Sign Up</button>}
        {error && <p>{error}</p>}
        
    </form>
  )
}