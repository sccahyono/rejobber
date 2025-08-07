import "./globals.css";
import { UserProvider } from '../context/user.context'

export const locations = [
  { label: 'All Locations', value: 'all' },
  { label: 'Remote', value: 'remote' },
  { label: 'Jakarta', value: 'jakarta' },
  { label: 'Singapore', value: 'singapore' },
  { label: 'Japan', value: 'japan' },
]
export const jobTypes = [
  { label: 'All Job Type', value: 'all' },
  { label: 'Full-Time', value: 'full-time' },
  { label: 'Part-Time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
