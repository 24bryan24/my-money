import styles from './ProfilePopUp.module.css'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignUp } from '../hooks/useSignUp'
import { authorizeProject } from '../firebase/config'

export default function ProfilePopUp() {

  const [inputType, setInputType] = useState('password')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [error, setError] = useState(null)  
   

  const { togglePopUp, name, changeName, copyOfName, changeCopyName } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleClose = () => {
    changeName(copyOfName)
    togglePopUp('profile')
  }

  const handleNameChange = (name) => {
    const user = authorizeProject.currentUser;
    user.updateProfile({
      displayName: name
    }).then(() => {
      // Update successful
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    }); 
    togglePopUp('profile')
      }

  const handleEmailChange = async (email) => {
    console.log('handleEmailChange', email)
    const user = authorizeProject.currentUser;
    user.updateEmail(email).then(() => {
        console.log('successful')
    }).catch((error) => {
        console.log(error)
    }); 
    togglePopUp('profile')
      }

  const handlePasswordChange = (password) => {
        const user = authorizeProject.currentUser;
        // const newPassword = getASecureRandomPassword();
        console.log(password)
        user.updatePassword(password).then(() => {
        // Update successful.
        }).catch((error) => {
        console.log(error)
        setError(error.message)
        // ...
        });
        togglePopUp('profile')
    }

    const toggleVisibilty = () => {
        if(inputType === 'text') {
        setInputType("password")
        } else {
          setInputType("text")
        }
    }

    console.log('hello')

  return (
    <div className={styles["popup-box"]}>
      <div className={styles.box}>
        <span className={styles["close-icon"]} onClick={handleClose}>x</span>
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2>Edit Profile Details</h2>
        <label>
          <span>Name: </span>
          <input 
              placeholder='Derek Sanders'
              type='text'
              onChange={(e) => changeName(e.target.value)}
              />
          <button onClick={() => handleNameChange(name)} className={styles.btn}>Change</button>
        </label>
        <br />
        <label>
          <span>Email: </span>
          <input 
              value={username}
              placeholder='example@domain.com'
              type='email'
              onChange={(e) => setUsername(e.target.value)}
              />
          <button onClick={() => handleEmailChange(username)} className={styles.btn}>Change</button>
        </label>
        <br />
        <label>
          <span>Password: </span>
          <input 
              value={password}
              placeholder='abc123!$'
              type={inputType}
              onChange={(e) => setPassword(e.target.value)}
              />
          <button onClick={() => handlePasswordChange(password)} className={styles.btn}>Password</button>
          <button type='button' onClick={toggleVisibilty} className={styles.btn}>Toggle Visibility</button>
        </label>
        <br />
        <button onClick={handleClose} className='btn'>Close</button>
        {error && <p>{error}</p>}
        
    </form>
      </div>
    </div>
  )
}
