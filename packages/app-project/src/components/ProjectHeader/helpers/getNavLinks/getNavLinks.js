import counterpart from 'counterpart'

function getNavLinks (isLoggedIn, baseUrl) {
  const links = [
    {
      href: `${baseUrl}/about`,
      text: counterpart('ProjectHeader.nav.about')
    },
    {
      href: `${baseUrl}/classify`,
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
