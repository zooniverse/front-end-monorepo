import { cookies } from 'next/headers'

import PageContextProviders from './PageContextProviders.js'
import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

export default function RootLayout({ children }) {

  const storedThemeMode = cookies().get('theme')

  return (
    <body>
      <PageContextProviders storedThemeMode={storedThemeMode?.value}>
        <PageHeader />
        {children}
        <PageFooter />
      </PageContextProviders>
    </body>
  )
}
