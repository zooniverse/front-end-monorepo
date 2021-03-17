import counterpart from 'counterpart'

function getNavLinks (isLoggedIn, baseUrl, defaultWorkflow) {
  const classifyHref = defaultWorkflow ? `${baseUrl}/classify/workflow/${defaultWorkflow}` : `${baseUrl}/classify`
  const aboutHref = (process.env.PANOPTES_ENV === 'production') ? `https://www.zooniverse.org${baseUrl}/about` : `${baseUrl}/about/research`
  const links = [
    {
      href: aboutHref,
      text: counterpart('ProjectHeader.nav.about')
    },
    {
      href: classifyHref,
      text: counterpart('ProjectHeader.nav.classify')
    },
    {
      href: `${baseUrl}/talk`,
      text: counterpart('ProjectHeader.nav.talk')
    },
    {
      href: `${baseUrl}/collections`,
      text: counterpart('ProjectHeader.nav.collect')
    }
  ]

  if (isLoggedIn) {
    links.push({
      href: `${baseUrl}/recents`,
      text: counterpart('ProjectHeader.nav.recents')
    })
  }

  return links
}

export default getNavLinks
