import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import DeleteButton from './DeleteButton'

export const THUMBNAIL_ASPECT_RATIO = 1.25

const StyledBox = styled(Box)`
  ${props => props.selected ? css`
      box-shadow: 0 0 8px 2px ${props.theme.global.colors['accent-1']};
    ` : ''
  }
`

const StyledButton = styled(Button)`
  flex-grow: 1;
  height: 100%;
`

const StyledImage = styled(Image)`
  border-radius: 4px;
  object-fit: cover;
`

function ChoiceButton({
  choiceId = '',
  choiceLabel = '',
  disabled = false,
  hasFocus = false,
  onChoose = () => true,
  onDelete = () => true,
  onKeyDown = () => true,
  selected = false,
  shadedBackground = false,
  src = '',
  tabIndex = -1,
  thumbnailSize = 'none'
}) {
  const choiceMenuItem = useRef(null)
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
    if (choiceMenuItem && hasFocus) {
      choiceMenuItem.current.focus()
    }
  })

  const background = selected
    ? 'neutral-1'
    : shadedBackground
      ? {
          dark: 'dark-4',
          light: 'light-1'
        }
      : {
          dark: 'dark-5',
          light: 'neutral-6'
        }
  const border = selected
    ? { color: 'neutral-6', size: '1px' }
    : undefined
  const textColor = selected 
    ? 'neutral-6' 
    : {
        dark: 'neutral-6',
        light: 'neutral-7'
      }
  const thumbnailHeight = 150
  const thumbnailWidth = Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x${thumbnailHeight}/${src.slice(8)}`
  
  return (
    <StyledBox
      ref={choiceMenuItem}  
      align='center'
      // TODO: add the following to translations
      // TODO: use selected to update aria-label to indicate identified and answers, if applicable
      a11yTitle={`Open submenu for ${choiceLabel}`}
      // TODO: refactor with data-fieldset, refactor Choice as fieldset, and refactor both with related links/ids/aria-controls
      aria-label={choiceLabel}
      role='menuitem'
      background={background}
      border={border}
      direction='row'
      fill
      onKeyDown={handleKeyDown}
      pad={{
        right: '10px',
        vertical: '5px'
      }}
      selected={selected}
      tabIndex={tabIndex}
    >
      {selected ? (
        <DeleteButton
          choiceLabel={choiceLabel}
          deleteFn={handleDelete}
          disabled={disabled}
          tabIndex={selected && tabIndex === 0 ? 0 : -1}
        >
          {thumbnailSize !== 'none' && src &&
            <StyledImage
              alt=''
              height='50'
              src={thumbnailSrc}
              width={thumbnailSize === 'small' ? '50' : '60'}
            />}
        </DeleteButton>
      ) : null}
      <StyledButton
        // TODO: add the following to translations
        a11yTitle={`Open fieldset for ${choiceLabel}`}
        disabled={disabled}
        label={
          <Box
            align='center'
            direction='row'
            forwardedAs='span'
          >
            {!selected && thumbnailSize !== 'none' && src &&
              <StyledImage
                alt=''
                height='50'
                src={thumbnailSrc}
                width={thumbnailSize === 'small' ? '50' : '60'}
              />}
            <Text
              color={textColor}
              margin={{ left: '10px', vertical: '5px' }}
              size={thumbnailSize === 'small' ? '.875rem' : '1rem'}
              weight={selected ? 'bold' : 'normal'}
              wordBreak='break-word'
            >
              {choiceLabel}
            </Text>
          </Box>
        }
        margin={{ left: '2px'}}
        onClick={handleClick}
        plain
        tabIndex={selected && tabIndex === 0 ? 0 : -1}
      />
    </StyledBox>
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
