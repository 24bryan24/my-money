import { useEffect, useState } from 'react'
import { authReducer } from '../context/AuthContext'
import { authorizeProject } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { login } = useAuthContext()

    const logMeIn = async (username, password) => {
        setError(null)
        setIsPending(true)
        try {
            // sign up user
            const res = await authorizeProject.signInWithEmailAndPassword(username, password)

            if(!res) {
                throw new Error('Could not complete new sign up')
            }

            // dispatch login action
            login(res.user)

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
    
    return { error, isPending, logMeIn }
}