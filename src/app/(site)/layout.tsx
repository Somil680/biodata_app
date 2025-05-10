import Header from "@/components/header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <div className="w-full">
          <Header/>
          <div className="bg-[#f7f7f7]">{children}</div>
   
    </div>
  )
}
