import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

  const roboto = Roboto({
    subsets: ['latin'],
    weight:['400','700'],
    variable: '--font-roboto'
})

export const metadata: Metadata = {
  openGraph: {
    locale: 'en-usa',
    title: 'CoinSynch',
    type: 'website',
    countryName: 'United-States',
    description: "Welcome to CoinSynch, the ultimate platform for buying and selling cryptocurrencies with ease and security. Explore a wide range of popular cryptocurrencies, track real-time rates, and manage your digital wallet effortlessly. With advanced trading tools and a user-friendly interface, CryptoTradeX empowers you to make informed decisions and take advantage of the dynamic cryptocurrency market. Whether you're a seasoned trader or just getting started, our dedicated customer support ensures a smooth and reliable trading experience. Join us now and become a part of the global crypto community!"

  },
  icons: {
    icon: 'http://localhost:3000/icon.svg'
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    }
  },
  category: 'games',
  title:  {
    default: 'CoinSynch',
    template: 'CoinSynch | %s'
  },
  applicationName: 'CoinSynch',
   keywords : [
    'Buy cryptocurrencies',
    'Sell cryptocurrencies',
    'Cryptocurrency exchange',
    'Trading platform',
    'Digital wallet for cryptocurrencies',
    'Cryptocurrency trading',
    'Cryptocurrency market',
    'Secure cryptocurrency transactions',
    'Cryptocurrency rates',
    'Buy Bitcoin',
    'Sell Ethereum',
    'Cryptocurrency deposit',
    'Cryptocurrency withdrawal',
    'Cryptocurrency transaction fees',
    'Transaction history',
    'Cryptocurrency market analysis',
    'Data and cryptocurrency security',
    'Cryptocurrency portfolio',
    'Customer support for cryptocurrencies',
    'Popular cryptocurrencies'
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  creator: 'João Souza',
  robots: {
    index: true,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br"  className={roboto.variable}>
      <body  >{children}</body>
    </html>
  )
}
