'use client'

import { Job } from "@/entities/job"
import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { getInitials } from "@/lib/util"

interface JobListProps {
  jobs: Job[],
  handleShow: () => void
}

export default function JobList({ jobs, handleShow }: JobListProps) {
  return (
    <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
          {jobs.map((job) => (
            <li key={job.id} className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                {job.company_logo == null && (
                  <div
                    className="size-12 flex rounded-lg bg-cyan-500 object-cover ring-1 ring-gray-900/10 items-center justify-center font-medium text-white"
                  >
                    {getInitials(job.company_name)}
                  </div>
                )}
                {job.company_logo != null && (
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
                <a href="#" className="ml-auto hover:text-cyan-600 text-sm font-medium" onClick={() => handleShow}>
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
  )
}