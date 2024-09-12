import { AboutHeader } from '@zooniverse/content'

export default function MockPage() {
  const links = [
    {
      href: '/mock',
      label: 'Mock'
    },
    {
      href: '/mock/resources',
      label: 'Resources'
    },
    {
      href: '/mock/faq',
      label: 'FAQ'
    }
  ]

  return (
    <>
      <AboutHeader links={links} navTitle='Mock' />
      <p>This is /mock</p>
    </>
  )
}
