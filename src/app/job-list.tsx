'use client'

import { Job } from "@/entities/job"
import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { getInitials } from "@/lib/util"

interface JobListProps {
  jobs: Job[],
  handleShow: (id: number) => void
}

export default function JobList({ jobs, handleShow }: JobListProps) {
  return (
    <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {jobs.map((job) => (
            <li key={job.id} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                {job.company_logo == null || job.company_logo == '' && (
                  <div
                    className="size-12 flex rounded-lg bg-cyan-500 object-cover ring-1 ring-gray-900/10 items-center justify-center font-medium text-white"
                  >
                    {getInitials(job.company_name)}
                  </div>
                )}
                {job.company_logo != null || job.company_logo != '' && (
                  <img
                    alt={job.title}
                    src={job.company_logo!}
                    className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                  />
                )}
                <dd className="">
                  <div className="text-sm/6 font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm/6 text-gray-500">at {job.company_name}</div>
                </dd>
                <a href="#" className="ml-auto hover:text-cyan-600 text-sm font-medium" onClick={() => handleShow(job.id!)}>
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
    </div>
  )
}