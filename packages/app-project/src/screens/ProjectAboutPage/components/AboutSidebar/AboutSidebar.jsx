import { Nav } from 'grommet'
import { useRouter } from 'next/router'
import { arrayOf, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import AboutNavLink from '../AboutNavLink'

const AboutSidebar = ({ aboutNavLinks }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  const { t } = useTranslation('screens')

  return (
    <Nav aria-label={t('About.PageNav.title')} direction='column' gap='xsmall' width='12rem'>
      <AboutNavLink
        link={{
          href: `${baseUrl}/research`,
          text: t('About.PageHeading.title.research')
        }}
      />
      <AboutNavLink
        link={{
          href: `${baseUrl}/team`,
          text: t('About.PageHeading.title.team')
        }}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: t('About.PageHeading.title.results')
          }}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: t('About.PageHeading.title.education')
          }}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: t('About.PageHeading.title.faq')
          }}
        />
      )}
    </Nav>
  )
}

AboutSidebar.propTypes = {
  aboutNavLinks: arrayOf(string),
}

export default AboutSidebar
