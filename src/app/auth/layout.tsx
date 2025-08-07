import { MegaphoneIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Link href="/" className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mx-auto">
            <MegaphoneIcon aria-hidden="true" className="size-10 text-gray-900 stroke-cyan-500 mx-auto" />
            </div>

            <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Join the job listing club!</h2>
        </Link>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {children}
        </div>
    </div>
  );
}