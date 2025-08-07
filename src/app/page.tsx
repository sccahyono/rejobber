'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/user.context'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'
import { getInitials } from '../lib/util'
import Navbar from '@/components/Navbar'
import Selection from '@/components/Selection'
import Link from 'next/link'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { jobTypes, locations } from '@/lib/constants'
import { getJobById, getJobs } from '@/api/job'
import { Job } from '@/entities/job'
import JobList from './job-list'
import JobDetail from './job-detail'

export default function Home() {
  const { user, loading, signOut } = useUser()
  const [selectedJobType, setSelectedJobType] = useState(jobTypes[0])
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [selectedJob, setSelectedJob] = useState<Job>()
  const [selectedJobID, setSelectedJobID] = useState<number>()
  const [open, setOpen] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])

  const handleOpen = (id: number) => {
    setSelectedJobID(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs({
        ...(selectedJobType.value != 'all' && { job_type: selectedJobType.label }),
        ...(selectedLocation.value != 'all' && { location: selectedLocation.label }),
      })
      setJobs(data)
    }

    fetchJobs()
  }, [jobs, selectedJobType, selectedLocation])

  useEffect(() => {
    if (!selectedJobID) return

    const fetchJob = async () => {
      const data = await getJobById(selectedJobID)
      setSelectedJob(data)
    }

    fetchJob()
  }, [selectedJobID])
  
  return (
    <>
      <Navbar user={user} handleSignOut={signOut}></Navbar>

      <main>
        <div className="relative isolate pt-16">
          <header className="pt-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base/7 font-semibold text-gray-900">Job Board</h1>
              <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
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
              </div>
              <Link
                href="/dashboard"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                hidden={user == null}
              >
                <ClipboardDocumentListIcon aria-hidden="true" className="-ml-1.5 size-5" />
                My Listings
              </Link>
            </div>
          </header>
        </div>

        <JobList jobs={jobs} handleShow={handleOpen}></JobList>
      </main>

      <JobDetail job={selectedJob} isOpen={open} handleClose={handleClose}></JobDetail>
    </>
  )
}
