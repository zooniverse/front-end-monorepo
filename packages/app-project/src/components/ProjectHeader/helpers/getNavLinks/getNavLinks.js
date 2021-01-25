import counterpart from 'counterpart'

function getNavLinks (isLoggedIn, baseUrl, defaultWorkflow) {
  const classifyHref = defaultWorkflow ?
    `/projects/[owner]/[project]/classify/workflow/[workflowID]` :
    `/projects/[owner]/[project]/classify`
  const classifyAs = defaultWorkflow ? `${baseUrl}/classify/workflow/${defaultWorkflow}` : `${baseUrl}/classify`
  const links = [
    {
      href: `${baseUrl}/about`,
      text: counterpart('ProjectHeader.nav.about')
    },
    {
      as: classifyAs,
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
