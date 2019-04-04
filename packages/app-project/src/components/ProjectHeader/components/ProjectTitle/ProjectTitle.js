import { Anchor, Heading } from 'grommet'
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

function ProjectTitle ({ href, title }) {
  return href
    ? <StyledAnchor href={href}><Title text={title} /></StyledAnchor>
    : <Title text={title} />
}

ProjectTitle.propTypes = {
  href: string,
  title: string
}

ProjectTitle.defaultProps = {
  href: '',
  title: ''
}

function Title ({ text }) {
  return (
    <StyledHeading color='white' margin='none' size='small'>
      {text}
    </StyledHeading>
  )
}

Title.propTypes = {
  title: string
}

Title.defaultProps = {
  title: ''
}

export default ProjectTitle
