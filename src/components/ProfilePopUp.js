import styles from './ProfilePopUp.module.css'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignUp } from '../hooks/useSignUp'
import { authorizeProject, storageProject } from '../firebase/config'
import visibilityOn from '../assets/visibilityOn.svg'
import visibilityOff from '../assets/visibilityOff.svg'

export default function ProfilePopUp() {

  const [inputType, setInputType] = useState('password')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [error, setError] = useState(null)  
  const [image, setImage] = useState('')
  const [visibilityImage, setVisibilityImage] = useState(visibilityOn)
   

  const { user, togglePopUp, name, email, changeName, copyOfName, changeCopyName, profilePhotoURL, changeProfilePhoto } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleClose = () => {
    const user = authorizeProject.currentUser;
    changeProfilePhoto(user.photoURL)
    changeName(user.displayName)
    window.URL.revokeObjectURL(profilePhotoURL)
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
        user.updatePassword(password).then(() => {
          console.log('successful')
        }).catch((error) => {
        console.log(error)
        setError(error.message)
        // ...
        });
        togglePopUp('profile')
    }
    let count = 0
    const toggleVisibilty = () => {
        if(inputType === 'text') {
        setInputType("password")
        setVisibilityImage(visibilityOn)
        } else {
          setInputType("text")
          setVisibilityImage(visibilityOff)
        }
    }

    const handleImageChange = (image) => {
        if(image) {
          const uploadTask = storageProject.ref(`images/${image.name}`).put(image);
          uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
              console.log(error)
            },
            () => {
              storageProject
              .ref('images')
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                const user = authorizeProject.currentUser;
                user.updateProfile({
                   photoURL: url
               }).then(() => {
               // Update successful
               }).catch((error) => {
               // An error occurred
               });
                changeProfilePhoto(url)
              });
        }
          )
        togglePopUp('profile')
    }
  }


  return (
    <div className={styles["popup-box"]}>
      <div className={styles.box}>
        <span className={styles["close-icon"]} onClick={handleClose}>x</span>
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
        <h2>Edit Profile Details</h2>
        <label>
          <span>Name: </span>
          <input 
              placeholder={name}
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
              placeholder={email}
              type='email'
              onChange={(e) => setUsername(e.target.value)}
              />
          <button onClick={() => handleEmailChange(username)} className={styles.btn}>Change</button>
        </label>
        <br />
        <label>
          <span>Password: </span>
          <img src={visibilityImage} className={styles.['eye-icon']} onClick={toggleVisibilty} />
          <input 
              value={password}
              placeholder='abc123!$'
              type={inputType}
              onChange={(e) => setPassword(e.target.value)}
              />
          <button onClick={() => handlePasswordChange(password)} className={styles.btn}>Change Password</button>
        </label>
        <br />
        <label>
          <span>Photo: </span>
          <input
              type='file'
              onChange={(e) => {
                setImage(e.target.files[0])
                changeProfilePhoto(window.URL.createObjectURL(e.target.files[0]))
                authorizeProject.onAuthStateChanged(user => {
                console.log('AuthContextState:', user)
              })
                }}
              />
          <button onClick={() => handleImageChange(image)} className={styles.btn}>Upload Photo</button>
        </label>
        <br />
        <button onClick={handleClose} className='btn'>Close</button>
        {error && <p>{error}</p>}
        
    </form>
      </div>
    </div>
  )
}
