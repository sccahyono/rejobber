'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../api/supabase'
import { getCurrentUser } from '../store/auth'
import { User } from '../entities/user'

interface UserContextType {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({ user: null, loading: true })

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On mount: check session, set user if available
    const loadUser = async () => {
      const supabaseUser = await getCurrentUser()
      if (supabaseUser) {
        setUser({ id: supabaseUser.id, display_name: supabaseUser.user_metadata.display_name, email: supabaseUser.email! })
      }
      setLoading(false)
    }

    loadUser()

    // Subscribe to auth changes, set null if logged out
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user
      setUser(user ? { id: user.id, display_name: user.user_metadata.display_name, email: user.email! } : null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}