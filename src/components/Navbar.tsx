'use client'
 
import { User } from '@/entities/user'
import { ArrowLeftStartOnRectangleIcon, ArrowLeftEndOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
 
interface NavbarProps{
    user: User | null,
    handleSignOut: () => Promise<void>,
}

export default function Navbar({ user, handleSignOut }: NavbarProps) {
    return (
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 px-6 ring-1 ring-white/5">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex flex-1 items-center justify-start gap-x-4">
            <div>
              <MegaphoneIcon aria-hidden="true" className="size-10 text-white stroke-cyan-600 mx-auto" />
            </div>
            <h2 className="text-cyan-600 font-bold">
              JOBBER
            </h2>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <div className="text-grey-900 font-medium text-sm" hidden={user != null}>
              Login to Post a Job
            </div>
            <div className="text-grey-900 font-medium text-sm" hidden={user == null}>
              Hi, {user?.display_name} 👋
            </div>
            <a
              href="#"
              className="text-gray-700 hover:bg-gray-50 hover:text-red-600"
              onClick={handleSignOut}
              hidden={user == null}
            >
              <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="-ml-1.5 size-5" />
            </a>
            <Link href="/auth/signin" hidden={user != null}>
              <ArrowLeftEndOnRectangleIcon aria-hidden="true" className="-ml-1.5 size-5" />
            </Link>
          </div>
        </div>
      </header>
    )
}