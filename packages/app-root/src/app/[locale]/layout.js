import RootLayout from '@/components/RootLayout'
import StyledComponentsRegistry from './style-registry'
import { GoogleTagManager } from '@next/third-parties/google'
import { notFound } from 'next/navigation'

import i18nConfig from '@/utils/i18nConfig'
import { getDictionary } from '@/utils/dictionaries'
import { supportedLocales } from '@/utils/localeMenu'

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
    apple: '/apple-icon.png'
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

const DEFAULT_LOCALE = i18nConfig.defaultLocale // 'en'

export default async function NextLayout(props) {
  // pass this locale from the dynamic URL subpath to ZooFooter because that lib-react-component client component is on every webpage
  const { locale } = await props.params

  // Dynamically import the JSON dictionary for the current locale in this server component.
  const dictionary = await getDictionary(locale)

  // Always provide the default lang dictionary as a fallback in cases where other locale dictionary keys are empty.
  const defaultDict = await getDictionary(DEFAULT_LOCALE)

  // Syntax required by i18next is --> [locale]: { translation: { ...dictionaries } }
  const dictionaries =
    locale === DEFAULT_LOCALE
      ? {
          [DEFAULT_LOCALE]: { translation: defaultDict }
        }
      : {
          [DEFAULT_LOCALE]: { translation: defaultDict },
          [locale]: { translation: dictionary }
        }

  if (!supportedLocales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale === 'test' ? 'en' : locale}>
      {isProduction && <GoogleTagManager gtmId='GTM-WDW6V4' />}
      <StyledComponentsRegistry>
        <RootLayout dictionaries={dictionaries} locale={locale}>
          {props.children}
        </RootLayout>
      </StyledComponentsRegistry>
    </html>
  )
}
