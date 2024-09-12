import { AboutHeader } from '@zooniverse/content'

export default function MockPage() {
  const links = [
    {
      href: '/',
      label: 'Mock'
    },
    {
      href: '/resources',
      label: 'Resources'
    },
    {
      href: '/faq',
      label: 'FAQ'
    }
  ]

  return (
    <>
      <AboutHeader links={links} navTitle='Mock' />
      <p>This is /mock/resources</p>
    </>
  )
}
