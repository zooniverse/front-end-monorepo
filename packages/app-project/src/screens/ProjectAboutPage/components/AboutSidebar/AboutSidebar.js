import AboutNavLink from '../AboutNavLink'
import { Nav } from 'grommet'
import { useRouter } from 'next/router'
import { arrayOf, object, string } from 'prop-types'

const AboutSidebar = ({ aboutNavLinks }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  return (
    <Nav flex direction='column' gap='xsmall' data-testid='about-sidebar'>
      <AboutNavLink
        link={{
          href: `${baseUrl}/research`,
          text: 'research'
        }}
        router={router}
      />
      <AboutNavLink
        link={{
          href: `${baseUrl}/team`,
          text: 'the team'
        }}
        router={router}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: 'results'
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: 'education'
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: 'faq'
          }}
          router={router}
        />
      )}
    </Nav>
  )
}

AboutSidebar.propTypes = {
  aboutNavLinks: arrayOf(string),
  router: object
}

export default AboutSidebar
