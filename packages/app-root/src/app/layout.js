import RootLayout from '@/components/RootLayout'
import StyledComponentsRegistry from './style-registry'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: {
    template: '%s | Zooniverse',
    default: 'Zooniverse'
  },
  description: `The Zooniverse is the world's largest and most popular platform for people-powered research.`,
  keywords: ['Zooniverse', 'Research'],
  openGraph: {
    images: 'https://static.zooniverse.org/assets/zooniverse-icon-web-black.png'
  },
  icons: {
    icon: '/icon.svg',
    apple: '/touch-icon.png'
  },
  twitter: {
    card: 'summary',
    creator: '@the_zooniverse'
  }
}

const isProduction = process.env.NODE_ENV === 'production'

export default function NextLayout({ children }) {
  return (
    <html lang='en'>
      {isProduction && <GoogleTagManager gtmId='GTM-WDW6V4' />}
      <StyledComponentsRegistry>
        <RootLayout>{children}</RootLayout>
      </StyledComponentsRegistry>
    </html>
  )
}
