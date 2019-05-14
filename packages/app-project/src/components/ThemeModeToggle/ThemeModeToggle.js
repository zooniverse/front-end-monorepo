import { SpacedText, withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button } from 'grommet'
import { Info } from 'grommet-icons'
import { func, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  white-space: nowrap;

  > div {
    flex-direction: ${(props) => (props.screenSize === 'small') ? 'row' : 'column-reverse'};
  }
`

const StyledInfo = styled(Info)`
  height: 1em;
  transform: ${(props) => (props.screensize === 'small') ? 'none' : 'rotate(270deg)'};
  margin-top: ${(props) => (props.screensize === 'small') ? '0' : '6px'};
  width: 1em;
`

const StyledText = styled(SpacedText)`
  transform: ${(props) => (props.screenSize === 'small') ? 'none' : 'rotate(180deg)'};
  writing-mode: ${(props) => (props.screenSize === 'small') ? 'unset' : 'vertical-lr'};
`

function ThemeModeToggle (props) {
  const { onClick, screenSize, theme: { dark } } = props
  const text = dark
    ? counterpart('ThemeModeToggle.switchToLight')
    : counterpart('ThemeModeToggle.switchToDark')

  const Label = (
    <StyledText color={{ dark: 'accent-2', light: 'neutral-2' }} screenSize={screenSize} size='medium'>
      {text}
    </StyledText>
  )

  return (
    <StyledButton
      a11yTitle={text}
      gap='xsmall'
      icon={<StyledInfo screensize={screenSize} />}
      label={Label}
      onClick={onClick}
      plain
      screenSize={screenSize}
    />
  )
}

ThemeModeToggle.propTypes = {
  mode: string,
  onClick: func
}

export default withTheme(withResponsiveContext(ThemeModeToggle))
