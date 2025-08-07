'use client'

import { ReactNode } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

export interface ListboxOption {
  label: string
  value: string
}

interface ListboxSelectProps {
  selected: ListboxOption
  onChange: (value: ListboxOption) => void
  options: ListboxOption[]
  className?: string
  icon?: ReactNode
}

export default function Selection({ selected, onChange, options, className = '', icon }: ListboxSelectProps) {
  return (
    <Listbox value={selected} onChange={onChange}>
        <Label className="sr-only">Change published status</Label>
        <div className="relative">
        <div className="inline-flex divide-x divide-yellow-700 rounded-md outline-hidden">
            <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-yellow-600 px-3 py-0 text-white">
                { icon != null ? icon : <CheckIcon aria-hidden="true" className="-ml-0.5 size-5" /> }
                <p className="text-sm font-semibold">{selected.label}</p>
            </div>
            <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-yellow-600 p-2 hover:bg-yellow-700 focus-visible:outline-2 focus-visible:outline-yellow-400">
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon aria-hidden="true" className="size-5 text-white forced-colors:text-[Highlight]" />
            </ListboxButton>
        </div>

        <ListboxOptions
            transition
            className="absolute z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
        >
            {options.map((option) => (
            <ListboxOption
                key={option.value}
                value={option}
                className="group cursor-default p-2 px-4 text-sm text-gray-900 select-none data-focus:bg-yellow-600 data-focus:text-white"
            >
                <div className="flex flex-col">
                <div className="flex justify-between">
                    <p className="font-normal group-data-selected:font-semibold">{option.label}</p>
                    <span className="text-yellow-600 group-not-data-selected:hidden group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                </div>
                </div>
            </ListboxOption>
            ))}
        </ListboxOptions>
        </div>
    </Listbox>
  )
}
