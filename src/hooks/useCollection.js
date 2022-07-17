import { useState, useEffect } from 'react'
import { firestoreProject } from '../firebase/config'

export const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
  
    useEffect(() => {
    
        let ref = firestoreProject.collection(collection)
        const unsub = ref.onSnapshot(snapshot => {
        if(snapshot.empty) {
          setError(`No ${collection} to load!`);
        } else {
          let results = [];
          snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()})
            console.log(doc.data())
          })
          setDocuments(results)
          setError(null)
        }
    }, (err) => {
      setError(err.message)
    })
    return () => unsub()

  }, [collection])

  return { documents, error }

}
