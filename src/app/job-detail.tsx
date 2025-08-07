'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {
  BriefcaseIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'
import { getInitials } from '../lib/util'
import { Job } from '@/entities/job'

interface JobDetailProps {
  job?: Job,
  isOpen: boolean,
  handleClose: () => void
}

export default function JobDetail({ job, isOpen, handleClose }: JobDetailProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
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
              { job != null  && (
                <div className="w-full">
                  <div className="flex items-center gap-x-4">
                    <div
                      className="size-12 flex rounded-lg bg-cyan-500 object-cover ring-1 ring-gray-900/10 items-center justify-center font-medium text-white"
                    >
                      {getInitials(job.company_name)}
                    </div>
                    <dd className="">
                      <div className="text-sm/6 font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm/6 text-gray-500">at {job.company_name}</div>
                    </dd>
                    <div className="ml-auto flex gap-x-8">
                      <div className='flex gap-x-2'>
                        <dt className="flex-none">
                          <span className="sr-only">Job Type</span>
                          <BriefcaseIcon className="h-6 w-5" />
                        </dt>
                        <dd className="text-sm/6 text-gray-900 font-medium">{job.job_type}</dd>
                      </div>
                      <div className='flex gap-x-2'>
                        <dt className="flex-none">
                          <span className="sr-only">Location</span>
                          <MapPinIcon className="h-6 w-5" />
                        </dt>
                        <dd className="text-sm/6 text-gray-900 font-medium">{job.location}</dd>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4 text-sm/6">
                    <p className="text-gray-900">{job.description}</p>
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}