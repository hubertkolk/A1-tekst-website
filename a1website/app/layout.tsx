import { Inter, Pacifico, Bangers, Permanent_Marker } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })
const bangers = Bangers({ weight: '400', subsets: ['latin'] })
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

