import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

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
  const { className, router, title } = props
  const { owner, project } = router.query
  const as = `/projects/${owner}/${project}`
  const href = '/projects/[owner]/[project]'

  const anchor = (
    <StyledAnchor
      className={className}
      label={(
        <StyledHeading children={title} color='white' margin='none' size='small' />
      )}
    />
  )

  if (router.pathname === href) {
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
