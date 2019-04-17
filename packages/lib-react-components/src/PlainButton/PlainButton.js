import { withKnobs, text } from '@storybook/addon-knobs'
import zooTheme from '@zooniverse/grommet-theme'
import { Button } from 'grommet'
import { func, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import SpacedText from '../SpacedText'

export const StyledPlainButton = styled(Button)`
  /* Is there another way to change the gap size between the icon and label? */
  > div > div {
    width: 5px;
  }

  &:focus,
  &:enabled:hover {
    text-decoration: underline;
  }
`

function PlainButton (props) {
  const { onClick, text,  } = props
  // const labelColor = determineColor(theme)
  return (
    <StyledPlainButton
      label={(
        <SpacedText
          color={{
            dark: 'accent-2',
            light: 'neutral-2'
          }}
        >
          {text}
        </SpacedText>
      )}
      onClick={onClick}
      plain
      {...props}
    />
  )
}

PlainButton.defaultProps = {
}

PlainButton.propTypes = {
  onClick: func,
  label: string,
  theme: string
}

export default withTheme(PlainButton)
