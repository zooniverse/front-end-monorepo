import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import addQueryParams from '../../../../helpers/addQueryParams'

const StyledHeading = styled(Heading)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  &:hover {
    text-decoration: none;
  }
  &[href]:hover {
    border-bottom-color: white;
  }
  &:not([href]) {
    cursor: default;
  }
`

function ProjectTitle (props) {
  const { router, title } = props
  const { owner, project } = router.query
  const as = addQueryParams(`/projects/${owner}/${project}`, router)
  const href = '/projects/[owner]/[project]'
  const isCurrentPage = router.pathname === href

  const anchor = (
    <StyledAnchor
      label={(
        <StyledHeading
          children={title}
          color='white'
          margin='none'
          size='small'
        />
      )}
    />
  )

  if (isCurrentPage) {
    return anchor
  } else {
    return (
      <Link as={as} href={href} passHref>
        {anchor}
      </Link>
    )
  }
}

export default withRouter(ProjectTitle)
export { ProjectTitle }
