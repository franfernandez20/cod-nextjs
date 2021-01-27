import { set } from 'lodash'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from '../firebase/client'


export default function useUser () {
    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(setUser)
    }, [])

    const logOut = () => setUser(null)
    return [user, logOut]
}