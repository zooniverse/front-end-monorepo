import counterpart from 'counterpart'

function getNavLinks (isLoggedIn, baseUrl) {
  const links = [
    {
      as: `${baseUrl}/about`,
      href: `/projects/[owner]/[project]/about`,
      text: counterpart('ProjectHeader.nav.about')
    },
    {
      as: `${baseUrl}/classify`,
      href: `/projects/[owner]/[project]/classify`,
      text: counterpart('ProjectHeader.nav.classify')
    },
    {
      as: `${baseUrl}/talk`,
      href: `/projects/[owner]/[project]/talk`,
      text: counterpart('ProjectHeader.nav.talk')
    },
    {
      as: `${baseUrl}/collections`,
      href: `/projects/[owner]/[project]/collections`,
      text: counterpart('ProjectHeader.nav.collect')
    }
  ]

  if (isLoggedIn) {
    links.push({
      as: `${baseUrl}/recents`,
      href: `/projects/[owner]/[project]/recents`,
      text: counterpart('ProjectHeader.nav.recents')
    })
  }

  return links
}

export default getNavLinks
