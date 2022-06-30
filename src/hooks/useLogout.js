import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { authorizeProject, firestoreProject } from "../firebase/config";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { logout } = useAuthContext()

    const logMeOut = async () => {
        setError(null)
        setIsPending(true)

        try {
            await authorizeProject.signOut()

            logout()

            if(!isCancelled) {
            setError(null)
            setIsPending(false)
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

    return { logMeOut, error, isPending }

}