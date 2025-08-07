'use client'

import { supabase } from '@/api/supabase'
import { User } from '@/entities/user'

export async function signUp(user: User): Promise<string | null> {
  const { display_name, email, password, confirmPassword } = user

  if (password !== confirmPassword) {
    return 'Passwords do not match.'
  }

  const { error } = await supabase.auth.signUp({ 
    email: email, 
    password: password!,
    options: {
        data: { display_name: display_name }
    }
 })

  if (error) {
    return error.message
  }

  return ''
}

export async function signIn(user: User): Promise<string | null> {
  const { email, password } = user

  const { error } = await supabase.auth.signInWithPassword({ 
    email: email, 
    password: password!,
 })

  if (error) {
    return error.message
  }

  return ''
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}