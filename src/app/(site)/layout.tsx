'use client'

import Navbar from "@/components/Homepage/Navbar"
import Footer from "@/components/Homepage/Footer"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global background pattern */}
      <div className="fixed inset-0 -z-50 bg-white bg-opacity-60">
        <div className="absolute inset-0 bg-[url('/patterns/subtle-dots.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
