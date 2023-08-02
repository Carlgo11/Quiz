import Script from "next/script";
import '@/styles/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Metadata} from "next";

export const runtime = 'edge'
export const metadata: Metadata = {
  title: 'Quiz'
}
export default function RootLayout({children,}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
      <head>
        <Script src="/color-mode.js"></Script>
      </head>
      <body suppressHydrationWarning={true}>
      <div className="container 100vh">{children}</div>
      </body>
      </html>
  )
}
