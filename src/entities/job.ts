export interface Job {
    id?: number,
    title: string
    company_logo?: string
    company_name: string
    description: string
    location: string
    job_type: string
    created_at?: Date
    created_by?: string
}