import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import { func, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  white-space: nowrap;
`

const StyledText = styled(SpacedText)`
  transform: rotate(180deg);
  writing-mode: vertical-lr;
`

function ThemeModeToggle (props) {
  const { onClick, theme: { dark } } = props
  const text = dark
    ? counterpart('ThemeModeToggle.switchToLight')
    : counterpart('ThemeModeToggle.switchToDark')

  const Label = (
    <StyledText color={{ dark: 'accent-2', light: 'neutral-2' }} size='medium'>
      {text}
    </StyledText>
  )

  return (
    <Box pad={{ top: 'small', right: 'small', bottom: 'small' }}>
      <StyledButton
        a11yTitle={text}
        label={Label}
        onClick={onClick}
        plain
      />
    </Box>
  )
}

ThemeModeToggle.propTypes = {
  mode: string,
  onClick: func
}

export default withTheme(ThemeModeToggle)
