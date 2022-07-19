import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

const StyledHeading = styled(Heading)`
  display: inline;
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
  const router = useRouter()
  const { title } = props
  const { owner, project } = router.query
  const linkProps = {
    href: addQueryParams(`/${owner}/${project}`, router)
  }

  const isCurrentPage = router.pathname === linkProps.href

  const label = (
    <StyledHeading
      color='white'
      margin='none'
    >
      {title}
    </StyledHeading>
  )
  const anchor = <StyledAnchor label={label} />

  if (isCurrentPage) {
    return anchor
  } else {
    return (
      <Link {...linkProps} passHref>
        {anchor}
      </Link>
    )
  }
}

export default ProjectTitle
