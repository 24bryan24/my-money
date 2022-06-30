import styles from './Home.module.css'
import { firestoreProject } from '../../firebase/config'
import { useEffect, useState } from 'react'

export default function Home() {

  const [photoURL, setPhotoURL] = useState(null)

  useEffect(async () => {
      await firestoreProject.collection('users').doc('a5NvHOQvvFCWSVHCiPcs').onSnapshot(doc => {
        setPhotoURL(doc.data().photo)
        console.log(doc.data().photo)
    })
  })


  return (

    <div>
        Home
        {photoURL && <img src={photoURL} />}
    </div>
  )
}
