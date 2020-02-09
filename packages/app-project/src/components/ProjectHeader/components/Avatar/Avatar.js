import counterpart from 'counterpart'
import { bool, string } from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledAvatar = styled.img`
  border-radius: 100%;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.22);
  object-fit: cover;
  overflow: hidden;
  ${props => css`width: ${props.width};`}
`

function Avatar (props) {
  if (!props.src) {
    return null
  }

  const { projectTitle, ...rest } = props
  const alt = counterpart('Avatar.alt', { project: projectTitle })
  const width = props.isNarrow ? '40px' : '80px'
  return (
    <StyledAvatar alt={alt} width={width} {...rest} />
  )
}

Avatar.propTypes = {
  isNarrow: bool,
  src: string
}

Avatar.defaultProps = {
  isNarrow: false
}

export default Avatar
