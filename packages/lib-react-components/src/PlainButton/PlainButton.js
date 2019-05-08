import { Button } from 'grommet'
import { bool, func, shape, string } from 'prop-types'
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
  const { onClick, labelSize, text } = props

  return (
    <StyledPlainButton
      label={(
        <SpacedText
          color={{
            dark: 'accent-2',
            light: 'neutral-2'
          }}
          size={labelSize}
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
  labelSize: 'medium',
  onClick: () => {},
  text: '',
  theme: {
    dark: false
  }
}

PlainButton.propTypes = {
  labelSize: string,
  onClick: func,
  text: string,
  theme: shape({
    dark: bool
  })
}

export default withTheme(PlainButton)
