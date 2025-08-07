'use client'

import { supabase } from './supabase'
import { Job } from '@/entities/job'

const TABLE_NAME = 'jobs'

// CREATE
export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'created_by'>) {
  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) throw authError ?? new Error('User not found')

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ ...job, created_by: authData.user.id }])
    .select()
    .single()

  console.log(error)

  if (error) throw error
  return data as Job
}

// READ - All jobs
export async function getJobs(filters: Partial<Job>) {
  let query =  supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.job_type)  { query = query.eq('job_type', filters.job_type) }
  if (filters.location)  { query = query.eq('location', filters.location) }
  if (filters.created_by)  { query = query.eq('created_by', filters.created_by) }
  
  const { data, error } = await query

  if (error) throw error 
  return data as Job[]
}

// READ - Single job
export async function getJobById(id: number) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Job
}

// UPDATE
export async function updateJob(id: number, updatedFields: Partial<Job>) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Job
}

// DELETE
export async function deleteJob(id: number) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}