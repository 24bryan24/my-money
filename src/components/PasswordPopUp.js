import styles from './PasswordPopUp.module.css'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignUp } from '../hooks/useSignUp'
import { authorizeProject } from '../firebase/config'

export default function PasswordPopUp({ username, setUsername }) {

  const [differentUsername, setDifferentUsername] = useState('')  
  const [error, setError] = useState(null)  

  const { togglePopUp, name, changeName, copyOfName, changeCopyName } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClose = () => {
    togglePopUp('password')
  }

  const handlePasswordChange = (username) => {
        authorizeProject.sendPasswordResetEmail(username)
       .then(() => {
        console.log('it worked')
         })
        .catch((error) => {
         var errorCode = error.code;
        var errorMessage = error.message;
          console.log(errorCode, errorMessage)
  });
        togglePopUp()
    }

  return (
    <div className={styles["popup-box"]}>
      <div className={styles.box}>
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <label>
          <span>Username:</span>
          <input 
              value={username}
              placeholder='abc123!$'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              />
          <button type='button' onClick={() => handlePasswordChange(username)} className={styles.btn}>Send Reset Password Link</button>
        </label>
        <br />
        <button onClick={handleClose} className='btn'>Close</button>
        {error && <p>{error}</p>}
        
    </form>
      </div>
    </div>
  )
}