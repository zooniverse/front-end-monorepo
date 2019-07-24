import counterpart from 'counterpart'

function getNavLinks (isLoggedIn, params) {
  const { owner, project } = params
  const baseUrl = `/projects/${owner}/${project}`
  const query = { owner, project }

  const links = [
    {
      as: `${baseUrl}/about`,
      href: { pathname: '/about/index', query },
      text: counterpart('ProjectHeader.nav.about')
    },
    {
      as: `${baseUrl}/classify`,
      href: { pathname: '/classify', query },
      text: counterpart('ProjectHeader.nav.classify')
    },
    {
      as: `${baseUrl}/talk`,
      href: { pathname: '/talk', query },
      text: counterpart('ProjectHeader.nav.talk')
    },
    {
      as: `${baseUrl}/collections`,
      href: { pathname: '/collections', query },
      text: counterpart('ProjectHeader.nav.collect')
    }
  ]

  if (isLoggedIn) {
    links.push({
      as: `${baseUrl}/recents`,
      href: { pathname: '/recents', query },
      text: counterpart('ProjectHeader.nav.recents')
    })
  }

  return links
}

export default getNavLinks
