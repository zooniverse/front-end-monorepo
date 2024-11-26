import { CloseButton } from '@zooniverse/react-components'
import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton({
  ariaChecked = undefined,
  choiceId = '',
  choiceLabel = '',
  columnsCount = 1,
  disabled = false,
  hasFocus = false,
  onChoose = () => true,
  onDelete = () => true,
  onKeyDown = () => true,
  role='button',
  selected = false,
  shadedBackground = false,
  src = '',
  tabIndex = -1,
  thumbnailSize = 'none'
}) {
  const choiceButton = useRef(null)
  const handleClick = useCallback(() => {
    onChoose(choiceId)
  }, [choiceId, onChoose])
  const handleDelete = useCallback(() => {
    onDelete(choiceId)
  }, [choiceId, onDelete])
  const handleKeyDown = useCallback((event) => {
    onKeyDown(choiceId, event)
  }, [choiceId, onKeyDown])

  useEffect(() => {
    if (choiceButton && hasFocus) {
      choiceButton.current.focus()
    }
  })

  const conditionalBackground = shadedBackground ? {
    dark: 'dark-4',
    light: 'light-1'
  } : {
    dark: 'dark-5',
    light: 'neutral-6'
  }
  const thumbnailWidth = Math.round(THUMBNAIL_ASPECT_RATIO * 50)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x50/${src.slice(8)}`
  
  return (
    <Box
      align='center'
      background={selected ? 'neutral-1' : conditionalBackground}
      direction='row'
      height='100%'
      justify='between'
      width='100%'
    >
      <Button
        ref={choiceButton}
        aria-checked={ariaChecked}
        disabled={disabled}
        flex='grow'
        label={
          <Box
            align='center'
            direction='row'
            forwardedAs='span'
          >
            {thumbnailSize !== 'none' && src &&
              <Image
                alt=''
                height='50'
                src={thumbnailSrc}
                width={thumbnailSize === 'small' ? '50' : '60'}
              />}
            <Text>
              {choiceLabel}
            </Text>
          </Box>
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        plain
        role={role}
        selected={selected}
        tabIndex={tabIndex}
      />
      {selected && (
        <CloseButton
          closeFn={handleDelete}
          disabled={disabled}
        />
      )}
    </Box>
  )
}

ChoiceButton.propTypes = {
  ariaChecked: PropTypes.string,
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  columnsCount: PropTypes.number,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onDelete: PropTypes.func,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  selected: PropTypes.bool,
  shadedBackground: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default ChoiceButton
// export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
