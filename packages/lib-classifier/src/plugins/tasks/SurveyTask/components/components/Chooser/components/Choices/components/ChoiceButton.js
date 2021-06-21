import {
  Box,
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import styled, { css, withTheme } from 'styled-components'
import { Media } from '@zooniverse/react-components'

const StyledChoiceButton = styled(Button)`
  ${props => props.selected
  ? css`background-color: ${props.theme.global.colors['brand']};`
  : props.theme.dark
    ? css`background-color: ${props.theme.global.colors['dark-5']};`
    : css`background-color: ${props.theme.global.colors['neutral-6']};`}
  border: none;
  border-radius: 0px;
  padding: 5px;
  text-align: start;

  &:focus, &:hover {
    background-color: ${props => props.theme.global.colors['accent-1']};
  }
`

export const THUMBNAIL_ASPECT_RATIO = 1.25

export function ChoiceButton (props) {
  const {
    choiceId,
    choiceLabel,
    hasFocus,
    onKeyDown,
    onChoose,
    selected,
    src,
    tabIndex,
    thumbnailSize
  } = props

  const choiceButton = useRef(null)
  useEffect(() => {
    if (choiceButton && hasFocus) {
      choiceButton.current.focus()
    }
  })

  let thumbnailHeight = 0
  if (thumbnailSize === 'small') {
    thumbnailHeight = 21
  }
  if (thumbnailSize === 'medium') {
    thumbnailHeight = 42
  }
  if (thumbnailSize === 'large') {
    thumbnailHeight = 84
  }

  return (
    <StyledChoiceButton
      ref={choiceButton}
      label={
        <Box
          direction='row'
          fill
          align='center'
        >
          {thumbnailSize !== 'none' && src &&
            <Media
              height={thumbnailHeight}
              margin={{ right: '1ch' }}
              src={src}
              width={thumbnailHeight * THUMBNAIL_ASPECT_RATIO}
            />}
          <Text
            color={{
              dark: 'neutral-6',
              light: 'dark-1'
            }}
            wordBreak='break-word'
          >
            {choiceLabel}
          </Text>
        </Box>
      }
      onClick={() => onChoose(choiceId)}
      onKeyDown={(event) => onKeyDown(choiceId, event)}
      selected={selected}
      size='small'
      tabIndex={tabIndex}
    />
  )
}

ChoiceButton.defaultProps = {
  choiceId: '',
  choiceLabel: '',
  hasFocus: false,
  onChoose: () => {},
  onKeyDown: () => {},
  selected: false,
  src: '',
  tabIndex: -1,
  theme: {
    dark: false,
    global: {
      colors: {}
    }
  },
  thumbnailSize: 'none'
}

ChoiceButton.propTypes = {
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onKeyDown: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  theme: PropTypes.shape({
    dark: PropTypes.bool,
    global: PropTypes.shape({
      colors: PropTypes.object
    })
  }),
  thumbnailSize: PropTypes.string
}

export default withTheme(ChoiceButton)
