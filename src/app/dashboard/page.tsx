'use client'

import { useState } from 'react'
import { useUser } from '@/context/user.context'
import { PlusIcon } from '@heroicons/react/20/solid'
import Navbar from '@/components/Navbar'
import Selection from '@/components/Selection'
import { jobTypes, locations } from '@/lib/constants'
import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Create from './create'
import { useRouter } from 'next/navigation'

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
  }
]

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useUser()
  const [selectedJobType, setSelectedJobType] = useState(jobTypes[0])
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [openCreate, setOpenCreate] = useState(false)

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

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Company Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Location
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Job Type
                        </th>
                        <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                          <span className="sr-only">Detail</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            {job.title}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{job.company_name}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{job.location}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{job.job_type}</td>
                          <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                            <a href="#" className="text-cyan-600 hover:text-cyan-900">
                              Edit<span className="sr-only">, {job.id}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Create open={openCreate} handleOpen={setOpenCreate} onSuccess={onCreated}/>
    </>
  )
}
