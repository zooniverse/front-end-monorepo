import { Anchor } from 'grommet'
import { Twitter } from 'grommet-icons'
import { string } from 'prop-types'
import styled, { css } from 'styled-components'

const StyledAnchor = styled(Anchor)`
  display: inline-flex;
  padding: 0;
  margin-left: 8px;

  svg path {
    transition: fill linear 0.1s;
  }

  &:focus,
  &:hover {
    svg path {
      ${props => css`fill: ${props.theme.global.colors.brand};`}
    }
  }
`

function TwitterLink ({ className = '', name = '', twitterId = '' }) {
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
