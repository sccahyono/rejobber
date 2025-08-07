'use client'

import { useState } from 'react'
import { signUp } from '@/store/auth'
import { User } from '@/entities/user'
import Link from 'next/link'
import router from 'next/router'

export default function SignUp() {
  const [form, setForm] = useState<User>({
    id: '',
    display_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const msg = await signUp(form)
    setMessage(msg)
    setLoading(false)

    if (msg == '') {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="display_name" className="block text-sm/6 font-medium text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              id="display_name"
              name="display_name"
              type="text"
              value={form.display_name}
              required
              onChange={handleChange}
              autoComplete="display_name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              required
              onChange={handleChange}
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              required
              onChange={handleChange}
              autoComplete="password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              required
              onChange={handleChange}
              autoComplete="confirmPassword"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-center text-red-600">{message}</p>
        )}
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-400">
        Already have account?{' '}
        <Link href="/auth/signin" className="font-semibold text-cyan-400 hover:text-cyan-300">
          Sign In
        </Link>
      </p>
    </>
  )
}
