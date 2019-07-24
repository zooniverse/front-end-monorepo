import { Anchor, Heading } from 'grommet'
import Link from 'next/link'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  &:focus,
  &:hover {
    text-decoration: none;
    border-color: white;
  }
`

const StyledHeading = styled(Heading)`
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`

function ProjectTitle (props) {
  const { link, title } = props
  let result = (
    <StyledHeading color='white' margin='none' size='small'>
      {title}
    </StyledHeading>
  )

  if (link) {
    result = (
      <Link as={link.as} href={link.href} passHref>
        <StyledAnchor>
          {result}
        </StyledAnchor>
      </Link >
    )
  }

  return result
}

ProjectTitle.propTypes = {
  href: string,
  title: string
}

ProjectTitle.defaultProps = {
  href: '',
  title: ''
}

export default ProjectTitle
