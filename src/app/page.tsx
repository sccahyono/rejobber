'use client'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArrowDownCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusIcon,
  PlusSmallIcon,
} from '@heroicons/react/20/solid'
import { BellIcon, MagnifyingGlassIcon, MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const secondaryNavigation = [
  { name: 'Last 7 days', href: '#', current: true },
  { name: 'Last 30 days', href: '#', current: false },
  { name: 'All-time', href: '#', current: false },
]
const stats = [
  { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
  { name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
  { name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
  { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
]
const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}
const days = [
  {
    date: 'Today',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: '00012',
        href: '#',
        amount: '$7,600.00 USD',
        tax: '$500.00',
        status: 'Paid',
        client: 'Reform',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: '00011',
        href: '#',
        amount: '$10,000.00 USD',
        status: 'Withdraw',
        client: 'Tom Cook',
        description: 'Salary',
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: '00009',
        href: '#',
        amount: '$2,000.00 USD',
        tax: '$130.00',
        status: 'Overdue',
        client: 'Tuple',
        description: 'Logo design',
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: 'Yesterday',
    dateTime: '2023-03-21',
    transactions: [
      {
        id: 4,
        invoiceNumber: '00010',
        href: '#',
        amount: '$14,000.00 USD',
        tax: '$900.00',
        status: 'Paid',
        client: 'SavvyCal',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
    ],
  },
]
const clients = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
]

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
  { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
]

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
    company_name: "Alpine",
    description: "<p></p>",
    location: "Jakarta",
    job_type: "Full-Time",
    created_at: new Date("2025-08-04T22:00:00+07:00"),
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 px-6 ring-1 ring-white/5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-start gap-x-4">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-3 p-3 md:hidden">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-5 text-gray-900" />
            </button>
            <div>
              <MegaphoneIcon aria-hidden="true" className="size-10 text-white stroke-cyan-600 mx-auto" />
            </div>
            <h2 className="text-cyan-600 font-bold">
              JOBBER
            </h2>
          </div>
          {/* <div className="flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-black/10 px-4 shadow-xs sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-white outline-hidden placeholder:text-gray-500 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-500"
                />
              </form>
            </div>
          </div> */}
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <div>
              Hi, Evan 👋
            </div>
            <a
              href="#"
              className="text-gray-700 hover:bg-gray-50 hover:text-red-600"
            >
              <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="-ml-1.5 size-5" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="relative isolate overflow-hidden pt-16">
          {/* Secondary navigation */}
          <header className="pt-6 pb-4 sm:pb-6">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
              <h1 className="text-base/7 font-semibold text-gray-900">Job Board</h1>
              <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                {secondaryNavigation.map((item) => (
                  <a key={item.name} href={item.href} className={item.current ? 'text-cyan-600' : 'text-gray-700'}>
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="#"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                <PlusIcon aria-hidden="true" className="-ml-1.5 size-5" />
                New Listing
              </a>
            </div>
          </header>
        </div>

        {/* Job list 1 */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                  <table className="relative min-w-full divide-y divide-gray-300">
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
                              Detail<span className="sr-only">, {job.id}</span>
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

        {/* Job list 2 */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-between">
              <h2 className="text-base/7 font-semibold text-gray-900">Recent clients</h2>
              <a href="#" className="text-sm/6 font-semibold text-cyan-600 hover:text-cyan-500">
                View all<span className="sr-only">, clients</span>
              </a>
            </div>
            <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {jobs.map((job) => (
                <li key={job.id} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <img
                      alt={job.title}
                      src={job.imageUrl}
                      className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                    />
                    <dd className="">
                      <div className="text-sm/6 font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm/6 text-gray-500">at {job.company_name}</div>
                    </dd>
                    <Menu as="div" className="relative ml-auto">
                      <MenuButton className="relative block text-gray-400 hover:text-gray-500">
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                          >
                            View<span className="sr-only">, {job.title}</span>
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                          >
                            Edit<span className="sr-only">, {job.title}</span>
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
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
      </main>
    </>
  )
}
