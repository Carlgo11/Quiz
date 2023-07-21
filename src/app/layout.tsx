import Script from "next/script";
import './global.css'
export const runtime = 'edge'

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
        <Script src="color-mode.js"></Script>
        <body suppressHydrationWarning={true} className="container 100vh">{children}</body>
        </html>
    )
}
