import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ToastProvider from '@/components/ToastProvider'

export const metadata = {
  title: 'Naveen Jewellery Works',
  description: 'work is workship',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 flex flex-col min-h-screen antialiased">
        {/* Fixed Header */}
        <Header />

        {/* Main content wrapper with top padding for fixed header */}
        <main className="flex-1 container mx-auto px-4 pt-24 pb-10">
          {children}
        </main>
        <ToastProvider />
        {/* Sticky Footer */}
        <Footer />
      </body>
    </html>
  )
}
