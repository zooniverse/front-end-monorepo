import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useStores } from '../../hooks'

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

function ProjectTitle({ textAlign = 'start', title = '' }) {
  const router = useRouter()
  const { slug } = useStores()
  const linkProps = {
    href: addQueryParams(`/${slug}`)
  }

  const isCurrentPage = router?.isReady && router?.asPath === linkProps.href

  if (isCurrentPage) {
    return (
      <StyledHeading level={1} color='white' margin='0' textAlign={textAlign}>
        {title}
      </StyledHeading>
    )
  } else {
    return (
      <StyledAnchor forwardedAs={Link} {...linkProps}>
        <StyledHeading level={1} color='white' margin='0' textAlign={textAlign}>
          {title}
        </StyledHeading>
      </StyledAnchor>
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
