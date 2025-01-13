import PageContextProviders from './PageContextProviders.js'
import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

export default function RootLayout({ children }) {
  return (
    <body>
      <PageContextProviders>
        <PageHeader />
        {children}
        <PageFooter />
      </PageContextProviders>
    </body>
  )
}
