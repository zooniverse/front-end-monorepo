import counterpart from 'counterpart'
import { shape, string } from 'prop-types'
import React from 'react'
import { Box } from 'grommet'
import { withRouter } from 'next/router'

import en from './locales/en'
import NavLink from './components/NavLink'

counterpart.registerTranslations('en', en)

function Nav (props) {
  const { owner, project } = props.router.query
  const baseUrl = `/projects/${owner}/${project}`
  return (
    <Box as='nav' direction='row' gap='medium'>
      <NavLink
        href={`${baseUrl}/about`}
        text={counterpart('Nav.about')} />
      <NavLink
        href={`${baseUrl}/classify`}
        text={counterpart('Nav.classify')}
      />
      <NavLink
        href={`${baseUrl}/talk`}
        text={counterpart('Nav.talk')}
      />
      <NavLink
        href={`${baseUrl}/collections`}
        text={counterpart('Nav.collect')}
      />
      <NavLink
        href={`${baseUrl}/recents`}
        text={counterpart('Nav.recents')}
      />
    </Box>
  )
}

Nav.propTypes = {
  router: shape({
    query: shape({
      owner: string,
      project: string,
    }),
  }),
}

export default withRouter(Nav)
