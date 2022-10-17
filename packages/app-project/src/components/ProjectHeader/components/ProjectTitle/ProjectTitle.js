import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { string } from 'prop-types'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

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

function ProjectTitle({
  textAlign = 'start',
  title = ''
}) {
  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const linkProps = {
    href: addQueryParams(`/${owner}/${project}`)
  }

  const isCurrentPage = router?.pathname === linkProps.href

  const anchor = (
    <StyledAnchor>
      <StyledHeading color='white' margin='none' textAlign={textAlign}>
        {title}
      </StyledHeading>
    </StyledAnchor>
  )

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

ProjectTitle.propTypes = {
  /** [Grommet textAlign](https://v2.grommet.io/heading#textAlign) for the heading. */
  textAlign: string,
  /** The project name */
  title: string
}
export default ProjectTitle
