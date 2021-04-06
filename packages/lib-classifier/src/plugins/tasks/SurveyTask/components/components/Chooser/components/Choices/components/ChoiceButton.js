import {
  Box,
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
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
    background-color: ${props => props.theme.global.colors['accent-2']};
  }
`

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton (props) {
  const {
    choiceId,
    choiceLabel,
    onChoose,
    selected,
    src,
    thumbnailSize
  } = props

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
      selected={selected}
      size='small'
    />
  )
}

ChoiceButton.defaultProps = {
  choiceId: '',
  choiceLabel: '',
  onChoose: () => {},
  selected: false,
  src: '',
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
  onChoose: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  theme: PropTypes.object,
  thumbnailSize: PropTypes.string
}

export default ChoiceButton
