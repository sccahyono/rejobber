'use client'

import { useState } from 'react'
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
import { jobTypes, locations } from './layout'
import { getJobs } from '@/api/job'

const jobs = [
  {
    id: 1,
    title: "Fullstack Developer",
    company_name: "Konexi",
    description: "<p></p>",
    location: "Remote",
    job_type: "Part-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',
  },
  {
    id: 2,
    title: "Backend Engineer",
    company_name: "Alpine",
    description: "<p></p>",
    location: "Jakarta",
    job_type: "Full-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
  },
  {
    id: 3,
    title: "Product Design",
    company_name: "Palu Gada",
    description: "<p></p>",
    location: "Jakarta",
    job_type: "Full-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: '',
  },
  {
    id: 4,
    title: "Fullstack Developer",
    company_name: "Konexi",
    description: "<p></p>",
    location: "Remote",
    job_type: "Part-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',
  },
  {
    id: 5,
    title: "Backend Engineer",
    company_name: "Alpine",
    description: "<p></p>",
    location: "Jakarta",
    job_type: "Full-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
  },
  {
    id: 6,
    title: "Product Design",
    company_name: "Palu Gada",
    description: "<p></p>",
    location: "Jakarta",
    job_type: "Full-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: '',
  }
]

export default function Home() {
  const { user, loading, signOut } = useUser()
  const [selectedJobType, setSelectedJobType] = useState(jobTypes[0])
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [open, setOpen] = useState(false)

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

        <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {jobs.map((job) => (
                <li key={job.id} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    {job.imageUrl == '' && (
                      <div
                        className="size-12 flex rounded-lg bg-cyan-500 object-cover ring-1 ring-gray-900/10 items-center justify-center font-medium text-white"
                      >
                        {getInitials(job.company_name)}
                      </div>
                    )}
                    {job.imageUrl.trim() && (
                      <img
                        alt={job.title}
                        src={job.imageUrl}
                        className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                      />
                    )}
                    <dd className="">
                      <div className="text-sm/6 font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm/6 text-gray-500">at {job.company_name}</div>
                    </dd>
                    <a href="#" className="ml-auto hover:text-cyan-600 text-sm font-medium" onClick={() => setOpen(true)}>
                      <ArrowsPointingOutIcon className='size-5' />
                    </a>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Location</dt>
                      <div className="font-medium text-gray-900">{job.location}</div>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Job Type</dt>
                      <div className="font-medium text-gray-900">{job.job_type}</div>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
          <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-8">
            <div className="-mt-px flex w-0 flex-1">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ArrowLongLeftIcon aria-hidden="true" className="mr-3 size-5 text-gray-400" />
                Previous
              </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                1
              </a>
              {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700  hover:border-gray-300" */}
              <a
                href="#"
                aria-current="page"
                className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                3
              </a>
              <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                ...
              </span>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                8
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                9
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                10
              </a>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Next
                <ArrowLongRightIcon aria-hidden="true" className="ml-3 size-5 text-gray-400" />
              </a>
            </div>
          </nav>

        </div>
      </main>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                <div className="w-full">
                  <div className="flex items-center gap-x-4">
                    <div
                      className="size-12 flex rounded-lg bg-cyan-500 object-cover ring-1 ring-gray-900/10 items-center justify-center font-medium text-white"
                    >
                      {getInitials("K")}
                    </div>
                    <dd className="">
                      <div className="text-sm/6 font-medium text-gray-900">Fullstack Developer</div>
                      <div className="text-sm/6 text-gray-500">at Konexi</div>
                    </dd>
                    <div className="ml-auto flex gap-x-8">
                      <div className='flex gap-x-2'>
                        <dt className="flex-none">
                          <span className="sr-only">Job Type</span>
                          <BriefcaseIcon className="h-6 w-5"/>
                        </dt>
                        <dd className="text-sm/6 text-gray-900 font-medium">Part-Time</dd>
                      </div>
                      <div className='flex gap-x-2'>
                        <dt className="flex-none">
                          <span className="sr-only">Location</span>
                          <MapPinIcon className="h-6 w-5"/>
                        </dt>
                        <dd className="text-sm/6 text-gray-900 font-medium">Remote</dd>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4 text-sm/6">
                    <p className="text-gray-900">Description</p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
