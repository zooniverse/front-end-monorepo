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
      background: ${props.theme.global.colors['neutral-1']};
      border: 1px solid ${props.theme.global.colors['neutral-6']};
      box-shadow: 0 0 8px 2px ${props.theme.global.colors['accent-1']};
    ` : css`
      background: ${props.shadedBackground ? props.theme.global.colors[props.theme.dark ? 'dark-4' : 'light-1'] : props.theme.global.colors[props.theme.dark ? 'dark-5' : 'neutral-6']};
      border: 2px solid ${props.shadedBackground ? props.theme.global.colors[props.theme.dark ? 'dark-4' : 'light-1'] : props.theme.global.colors[props.theme.dark ? 'dark-5' : 'neutral-6']};
    `
  }
  color: ${props => props.selected ? props.theme.global.colors['neutral-6'] : props.theme.global.colors[props.theme.dark ? 'neutral-6' : 'neutral-7']};

  &:focus {
    border: 2px solid ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }
  
  &:hover {
    background: ${props => props.theme.global.colors['accent-1']};
    border: 2px solid ${props => props.theme.global.colors['accent-1']};
    box-shadow: 0 0 8px 2px ${props => props.theme.global.colors['accent-1']};
    color: ${props => props.theme.global.colors['neutral-7']};
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

const DEFAULT_HANDLER = () => true

function ChoiceButton({
  choiceId = '',
  choiceLabel = '',
  disabled = false,
  hasFocus = false,
  onChoose = DEFAULT_HANDLER,
  onDelete = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
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

  const thumbnailHeight = 150
  const thumbnailWidth = Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x${thumbnailHeight}/${src.slice(8)}`
  
  return (
    <StyledBox
      ref={choiceMenuItem}  
      // TODO: add the following to translations
      a11yTitle={`${choiceLabel}` + (selected ? '; identified' : '')}
      aria-haspopup='true'
      role='menuitem'
      align='center'
      direction='row'
      fill
      onKeyDown={disabled ? DEFAULT_HANDLER : handleKeyDown}
      pad={{
        right: '10px',
        vertical: '5px'
      }}
      shadedBackground={shadedBackground}
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
        a11yTitle={`Open submenu for ${choiceLabel}`}
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
