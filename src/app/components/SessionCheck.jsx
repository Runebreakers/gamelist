'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function SessionChecker() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (data?.session?.user) {
                setUser(data.session.user)
            } else {
                console.error(error.message)
            }
        }

        getSession()
    }, [])

    if (!user) {
        return <p>Not logged in</p>
    }

    return <p>Welcome, {user?.user_metadata?.display_name} </p>
}
