import PageContextProviders from './PageContextProviders.js'
import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

export default function RootLayout({ children, dictionary, locale }) {
  return (
    <body>
      <PageContextProviders dictionary={dictionary} locale={locale}>
        <PageHeader />
        {children}
        <PageFooter locale={locale} />
      </PageContextProviders>
    </body>
  )
}
