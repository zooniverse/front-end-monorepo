import PageContextProviders from './PageContextProviders.js'
import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

export default function RootLayout({ children, dictionaries, locale }) {
  return (
    <body>
      <PageContextProviders dictionaries={dictionaries} locale={locale}>
        <PageHeader />
        {children}
        <PageFooter locale={locale} />
      </PageContextProviders>
    </body>
  )
}
