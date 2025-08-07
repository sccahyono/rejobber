'use client' // If used in a client-side component

import { supabase } from '@/api/supabase'
import { Job } from '@/entities/job'

const TABLE_NAME = 'jobs'

// ✅ CREATE
export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'created_by'>) {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) throw authError ?? new Error('User not found')

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ ...job, created_by: authData.user.id }])
    .select()
    .single()

  if (error) throw error
  return data as Job
}

// ✅ READ - All jobs
export async function getJobs() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Job[]
}

// ✅ READ - Single job
export async function getJobById(id: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Job
}

// ✅ UPDATE
export async function updateJob(id: string, updatedFields: Partial<Job>) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Job
}

// ✅ DELETE
export async function deleteJob(id: string) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}