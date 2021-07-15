import { func, string } from 'prop-types'
import counterpart from 'counterpart'
import React from 'react'
import styled from 'styled-components'
import { Button } from 'grommet'
import CloseIcon from './components/CloseIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  height: 1rem;
  padding: 0;
  width: 1rem;

  svg {
    opacity: 0.7;
  }

  &:active svg,
  &:hover svg, &:focus svg {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

function CloseButton ({ as, closeFn, color, disabled, href, ...rest }) {
  // Dunno why anyone would do this to do this button
  // But let's keep them from doing something that
  // shouldn't be done
  const renderAs = as || href && disabled && 'span'

  return (
    <StyledButton
      a11yTitle={counterpart('CloseButton.close')}
      as={renderAs}
      disabled={disabled}
      icon={<CloseIcon color={color} size='15px' />}
      href={href}
      onClick={closeFn}
      {...rest}
    />
  )
}

CloseButton.propTypes = {
  className: string,
  closeFn: func.isRequired
}

CloseButton.defaultProps = {
  className: ''
}

export default CloseButton
