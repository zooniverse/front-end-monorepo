import AboutNavLink from './AboutNavLink'
import { Nav } from 'grommet'
import { withRouter } from 'next/router'
import { arrayOf, object, string } from 'prop-types'

const AboutSidebar = ({ router, aboutNavLinks }) => {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  return (
    <Nav flex direction="column" gap="xsmall">
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

export { AboutSidebar }
export default withRouter(AboutSidebar)
