import { MegaphoneIcon } from '@heroicons/react/24/outline'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mx-auto">
            <MegaphoneIcon aria-hidden="true" className="size-10 text-white stroke-cyan-500 mx-auto" />
            </div>

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Join the job listing club!</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {children}
        </div>
    </div>
  );
}