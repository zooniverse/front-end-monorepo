// Note that this file is named in the Next.js App Router convention for future refactor
import AboutHeader from '../AboutHeader'

function PageLayout({ children }) {
  return (
    <>
      <AboutHeader />
      {children}
    </>
  )
}

export default PageLayout
