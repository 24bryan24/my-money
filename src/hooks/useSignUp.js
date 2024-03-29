import { useEffect, useState } from 'react'
import { authReducer } from '../context/AuthContext'
import { authorizeProject } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { create } = useAuthContext()

    const signup = async (username, password, name) => {
        setError(null)
        setIsPending(true)
        try {
            // sign up user
            const res = await authorizeProject.createUserWithEmailAndPassword(username, password)

            if(!res) {
                throw new Error('Could not complete new sign up')
            }
            
            // add display name to user
            await res.user.updateProfile({ displayName: name })

            // dispatch login action
            create(res.user)

            // update state
            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch(err) {
            if(!isCancelled) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }

          useEffect(() => {
             return () => setIsCancelled(true)
          }, [])
    
    return { error, isPending, signup }
}
