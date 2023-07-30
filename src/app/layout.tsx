import Script from "next/script";
import '@/styles/global.css'
export const runtime = 'edge'

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
        <head>
            <Script src="color-mode.js"></Script>
        </head>
        <body suppressHydrationWarning={true}><div className="container 100vh">{children}</div></body>
        </html>
    )
}
