import Script from "next/script";
import '@/styles/global.css'
import {NavBar} from "@/components/NavBar";
import 'bootstrap/dist/css/bootstrap.css'

export const runtime = 'edge'

export default function AdminLayout({children,}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
        <Script src="/color-mode.js"></Script>
        <title>Admin Portal</title>
      </head>
      <body suppressHydrationWarning={true}>
      <NavBar/>
      <div className="container 100vh">{children}</div>
      </body>
      </html>
  )
}
