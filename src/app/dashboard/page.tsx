'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/user.context'
import { PlusIcon } from '@heroicons/react/20/solid'
import Navbar from '@/components/Navbar'
import Selection from '@/components/Selection'
import { jobTypes, locations } from '@/lib/constants'
import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Create from './create'
import { useRouter } from 'next/navigation'
import { getJobs } from '@/api/job'
import { Job } from '@/entities/job'
import JobList from './job-list'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useUser()
  const [selectedJobType, setSelectedJobType] = useState(jobTypes[0])
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [openCreate, setOpenCreate] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs({
        created_by: user?.id,
        ...(selectedJobType.value != 'all' && { job_type: selectedJobType.label }),
        ...(selectedLocation.value != 'all' && { location: selectedLocation.label }),
      })
      setJobs(data)
    }

    fetchJobs()
  }, [jobs, selectedJobType, selectedLocation])

  const onCreated = () => {
    router.refresh()
  }

  return (
    <>
      <Navbar user={user} handleSignOut={signOut}></Navbar>

      <main>
        <div className="relative isolate pt-16">
          <header className="pt-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base/7 font-semibold text-gray-900">Job Board</h1>
              <Selection
                  selected={selectedJobType}
                  onChange={setSelectedJobType}
                  options={jobTypes}
                  icon={<BriefcaseIcon aria-hidden="true" className="-ml-0.5 size-5" />}
                >
                </Selection>
                <Selection
                  selected={selectedLocation}
                  onChange={setSelectedLocation}
                  options={locations}
                  icon={<MapPinIcon aria-hidden="true" className="-ml-0.5 size-5" />}
                >
                </Selection>
              <button
                type='button'
                className="ml-auto flex items-center gap-x-1 rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={() => setOpenCreate(true)}
              >
                <PlusIcon aria-hidden="true" className="-ml-1.5 size-5" />
                New Listing
              </button>
            </div>
          </header>
        </div>

        <JobList jobs={jobs} handleShow={() => openCreate}></JobList>
      </main>

      <Create open={openCreate} handleOpen={setOpenCreate} onSuccess={onCreated}/>
    </>
  )
}
