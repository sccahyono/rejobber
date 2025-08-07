'use client'

import { createJob } from "@/api/job"
import { Job } from "@/entities/job"
import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { jobTypes } from "../layout"
 
interface CreateProps{
    open: boolean,
    handleOpen: Dispatch<SetStateAction<boolean>>,
    onSuccess: () => void,
}

export default function Create({ open, handleOpen, onSuccess }: CreateProps) {
  const [form, setForm] = useState<Job>({
    title: '',
    company_logo: '',
    company_name: '',
    description: '',
    location: '',
    job_type: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const data = await createJob(form)
    setLoading(false)
    
    onSuccess()
  }

  return (
    <Dialog open={open??false} onClose={handleOpen} className="relative z-10">
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
              <button
                type="button"
                onClick={() => handleOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <form className='w-full' onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div className="border-b border-gray-900/10 pb-8">
                    <h2 className="text-base/7 font-semibold text-gray-900">Create Job Listing</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                          Job Title
                        </label>
                        <div className="mt-2">
                          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              value={form.title}
                              required
                              onChange={handleChange}
                              placeholder="e.g. Fullstack Developer"
                              className="block w-full min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                          Job Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            value={form.description}
                            required
                            onChange={handleTextChange}
                            placeholder="Describe the job description here"
                          />
                        </div>
                      </div>
                    
                      <div className="sm:col-span-3">
                        <label htmlFor="company_name" className="block text-sm/6 font-medium text-gray-900">
                          Company Name
                        </label>
                        <div className="mt-2">
                          <input
                            id="company_name"
                            name="company_name"
                            type="text"
                            autoComplete="company-name"
                            value={form.company_name}
                            required
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="e.g. Acme Inc."
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="company_logo" className="block text-sm/6 font-medium text-gray-900">
                          Company Logo URL
                        </label>
                        <div className="mt-2">
                          <input
                            id="company_logo"
                            name="company_logo"
                            type="text"
                            autoComplete="company-logo-url"
                            value={form.company_logo}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="e.g. https://acme.inc/logo.png"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="job_type" className="block text-sm/6 font-medium text-gray-900">
                          Job Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <select
                            id="job_type"
                            name="job_type"
                            autoComplete="job-type"
                            value={form.job_type}
                            required
                            onChange={handleSelectChange}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          >
                            {jobTypes.filter((jobType, idx) => (idx > 0)).map((jobType) => (
                              <option key={jobType.value} value={jobType.value}>{jobType.label}</option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
                          Job Location
                        </label>
                        <div className="mt-2">
                          <input
                            id="location"
                            name="location"
                            type="text"
                            autoComplete="location"
                            value={form.location}
                            required
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="e.g. Jakarta"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}