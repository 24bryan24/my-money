import { useState } from 'react'
import { authorizeProject } from '../firebase/config'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signup = async (username, password, name) => {
        setError(null)
        setIsPending(true)
        try {
            // sign up user
            const res = await authorizeProject.createUserWithEmailAndPassword(username, password)
            console.log(res.user)

            if(!res) {
                throw new Error('Could not complete new sign up')
            }
            
            // add display name to user
            await res.user.updateProfile({ displayName: name })
            setIsPending(false)
            setError(null)

        } catch(err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
    
    return { error, isPending, signup }
}
