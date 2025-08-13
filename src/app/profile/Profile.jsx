'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Spinner from '../components/Loading'
import Image from 'next/image'


export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
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
                toast.error('You have to log in first', { duration: 4000 })
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
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
    }, [])

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
        return <Spinner />
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
                            Sign out
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
                            {/* Profile Form */}
                            <div>
                                <div>
                                    <label>
                                        Username
                                    </label>
                                    <input 
                                        type='text'
                                        value={profile.username}
                                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                        disabled={!editing}
                                    />
                                </div>

                                <div>
                                    <label>
                                        Bio
                                    </label>
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                        disabled={!editing}
                                        rows={4}
                                        placeholder='Tell something about yourself'
                                    />
                                </div>

                                <div>
                                    <label>
                                        Avatar URL
                                    </label>
                                    <input 
                                        type='url'
                                        value={profile.avatar_url}
                                        onChange={(e) => setProfile({...profile, avatar_url: e.target.value})}
                                        disabled={!editing}
                                        placeholder='Enter your avatar URL'
                                    />
                                </div>
                            </div>

                            <div>
                                {
                                editing ? (
                                    <>
                                        <button
                                            onClick={updateProfile}
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <button
                                            onClick={() => setEditing(false)}
                                            disabled={loading}                                          
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


