import Script from "next/script";
import '@/styles/global.css'
import {NavBar} from "@/components/admin/NavBar";
import 'bootstrap/dist/css/bootstrap.css'
import {Metadata} from "next";

export const runtime = 'edge'
export const metadata: Metadata = {
  title: 'Admin Panel'
}
export default function AdminLayout({children,}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
        <Script src="/color-mode.js"></Script>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      </head>
      <body suppressHydrationWarning={true}>
      <NavBar/>
      <div className="container 100vh">{children}</div>
      </body>
      </html>
  )
}
