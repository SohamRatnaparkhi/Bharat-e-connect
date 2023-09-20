import './globals.css'
import 'regenerator-runtime/runtime'
import "core-js/stable";
import { Inter } from 'next/font/google'

import { Montserrat } from 'next/font/google'

const mont = Montserrat({
  subsets: ['latin-ext'],
  display: 'swap',
  weights: [400, 500, 600, 700],
  variable: '--font-mont'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mont.className}>{children}</body>
    </html>
  )
}
