import {
  Box,
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { Media, withThemeContext } from '@zooniverse/react-components'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton (props) {
  const {
    choiceId,
    choiceLabel,
    disabled,
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
    <Button
      ref={choiceButton}
      disabled={disabled}
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
  disabled: false,
  hasFocus: false,
  onChoose: () => {},
  onKeyDown: () => {},
  selected: false,
  src: '',
  tabIndex: -1,
  thumbnailSize: 'none'
}

ChoiceButton.propTypes = {
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onKeyDown: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
