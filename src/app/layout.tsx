export const runtime = 'edge'

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body suppressHydrationWarning={true} className="container 100vh">{children}</body>
        </html>
    )
}
