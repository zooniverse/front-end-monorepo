import counterpart from 'counterpart'
import { Anchor } from 'grommet'
import { Twitter } from 'grommet-icons'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledAnchor = styled(Anchor)`
  display: inline-flex;
  align-items: center;

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
  const a11yTitle = counterpart('TwitterLink.a11yTitle', { name })
  return (
    <StyledAnchor
      a11yTitle={a11yTitle}
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
