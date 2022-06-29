import AboutNavLink from '../AboutNavLink'
import { Nav } from 'grommet'
import { useRouter } from 'next/router'
import { arrayOf, object, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

const AboutSidebar = ({ aboutNavLinks }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  const { t } = useTranslation('screens')

  return (
    <Nav aria-label={t('About.PageNav.title')} flex direction='column' gap='xsmall'>
      <AboutNavLink
        link={{
          href: `${baseUrl}/research`,
          text: t('About.PageHeading.title.research')
        }}
        router={router}
      />
      <AboutNavLink
        link={{
          href: `${baseUrl}/team`,
          text: t('About.PageHeading.title.team')
        }}
        router={router}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: t('About.PageHeading.title.results')
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: t('About.PageHeading.title.education')
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: t('About.PageHeading.title.faq')
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
