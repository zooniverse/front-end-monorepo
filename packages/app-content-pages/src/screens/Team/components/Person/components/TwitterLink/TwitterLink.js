import { Anchor } from 'grommet'
import { Twitter } from 'grommet-icons'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  align-items: center;
  display: inline-flex;
  padding: 0;

  svg path {
    transition: fill linear 0.1s;
  }

  &:focus,
  &:hover {
    svg path {
      fill: ${props => props.theme.global.colors.brand};
    }
  }
`

function TwitterLink (props) {
  const { className, name, twitterId } = props
  return (
    <StyledAnchor
      a11yTitle={name}
      className={className}
      href={`https://twitter.com/${twitterId}`}
      icon={<Twitter color='light-5' size='18px' />}
    />
  )
}

TwitterLink.propTypes = {
  name: string,
  twitterId: string
}

export default TwitterLink
