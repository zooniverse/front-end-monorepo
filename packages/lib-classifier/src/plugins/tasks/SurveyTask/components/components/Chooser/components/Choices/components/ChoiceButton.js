import {
  Box,
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { Media, withThemeContext } from '@zooniverse/react-components'

import theme from './theme'

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
    <Button
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
              width={Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)}
            />}
          <Text
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
  thumbnailSize: 'none'
}

ChoiceButton.propTypes = {
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  onChoose: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
