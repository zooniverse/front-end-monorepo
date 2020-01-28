import { PlainButton, withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { Info } from 'grommet-icons'
import { func, string } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(PlainButton)`
  white-space: nowrap;

  > div {
    flex-direction: ${(props) => (props.screenSize === 'small') ? css`row` : css`column-reverse`};

    span {
      transform: ${(props) => (props.screenSize === 'small') ? css`none` : css`rotate(180deg)`};
      writing-mode: ${(props) => (props.screenSize === 'small') ? css`unset` : css`vertical-lr`};
    }
  }
`

const StyledInfo = styled(Info)`
  transform: ${(props) => (props.screensize === 'small') ? css`none` : css`rotate(270deg)`};
  margin-top: ${(props) => (props.screensize === 'small') ? css`0` : css`6px`};
`

function ThemeModeToggle (props) {
  const { onClick, screenSize, theme: { dark } } = props
  const text = dark
    ? counterpart('ThemeModeToggle.switchToLight')
    : counterpart('ThemeModeToggle.switchToDark')

  return (
    <Box justify='center'>
      <StyledButton
        a11yTitle={text}
        icon={<StyledInfo color='dark-5' screensize={screenSize} size='1em' />}
        text={text}
        onClick={onClick}
        screenSize={screenSize}
      />
    </Box>
  )
}

ThemeModeToggle.propTypes = {
  mode: string,
  onClick: func
}

export default withTheme(withResponsiveContext(ThemeModeToggle))
