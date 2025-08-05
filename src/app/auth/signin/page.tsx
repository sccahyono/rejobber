'use client'

export default function SignIn() {
  return (
    <>
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-400">
        Not a member?{' '}
        <a href="#" className="font-semibold text-cyan-400 hover:text-cyan-300">
          Sign Up
        </a>
      </p>
    </>
  )
}
