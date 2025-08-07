import "./globals.css";
import { UserProvider } from '../context/user.context'

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
