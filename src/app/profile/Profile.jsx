'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Loading from './Loading'
import Image from 'next/image'


export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({
        username: '',
        bio: '',
        avatar_url: ''
    })
    const [editing, setEditing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            if (session?.user) {
                setUser(session.user)
                await fetchProfile(session.user.id)
            } else {
                setUser(null)
                toast.error('You have to log in first')
                router.push('/login')
            } 
            setLoading(false)
        }

        fetchUser()

        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                setUser(session.user)
                await fetchProfile(session.user.id)
            } else {
                setUser(null)
            }
        })

        return () => {
            data?.subscription.unsubscribe()
        }
    }, [router])

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error && error.code !== 'PGRST116') {
                throw error
            }

            if (data) {
                setProfile({
                    username: data.username || '',
                    bio: data.bio || '',
                    avatar_url: data.avatar_url || ''
                })
            }
        } catch (error) {
            toast.error('Error fetching profile: ' + error.message)
        }
    }

    const updateProfile = async () => {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username: profile.username,
                bio: profile.bio,
                avatar_url: profile.avatar_url,
                updated_at: new Date().toISOString()
            }

            const { error } = await supabase
                .from('profiles')
                .upsert(updates)

            if (error) {
                throw error
            }

            toast.success('Profile updated successfully')
            setEditing(false)
        } catch ( error ) {
            toast.error('Error updating profile: ' + error.message)
        } finally {
            setLoading(false)
            
        }
    }

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/')
            toast.success('Successfully logged out')
        } catch ( error ) {
            toast.error('Error logging out: ' + error.message)
        }
    }

    if (loading) {
        return <Loading />
    }

    if(!user) {
        return null
    }

    return (
        <div>
            <div>
                <div>
                    {/* Header */}
                    <div>
                        <h1>Profile</h1>
                        <button
                            onClick={signOut}
                            className="text-red-600 hover:text-red-800"
                        >

                        </button>
                    </div>
                    {/* Profile Info */}
                    <div>
                        <div>
                            <div>
                                {profile.avatar_url ? (
                                    <Image 
                                        src={profile.avatar_url}
                                        alt="Avatar"
                                        width={24}
                                        height={24}
                                        className="rounded-full object-cover"
                                    />

                                ) : (
                                    <span>
                                        {profile.username.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
