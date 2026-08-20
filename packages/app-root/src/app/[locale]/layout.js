import RootLayout from '@/components/RootLayout'
import StyledComponentsRegistry from './style-registry'
import { GoogleTagManager } from '@next/third-parties/google'
import { notFound } from 'next/navigation'

import i18nConfig from '../../../i18nConfig'

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
  },
  other: {
    'zooniverse:deployed_commit': process.env.COMMIT_ID,
    'zooniverse:deployed_app': 'fe-root'
  }
}

const isProduction = process.env.NODE_ENV === 'production'

export default async function NextLayout(props) {
  const { locale } = await props.params // pass this locale from the dynamic URL subpath to ZooFooter because that client component is on every webpage

  if (!i18nConfig.locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale === 'test' ? 'en' : locale}>
      {isProduction && <GoogleTagManager gtmId='GTM-WDW6V4' />}
      <StyledComponentsRegistry>
        <RootLayout locale={locale}>{props.children}</RootLayout>
      </StyledComponentsRegistry>
    </html>
  )
}
