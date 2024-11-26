import { CloseButton } from '@zooniverse/react-components'
import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

const StyledBox = styled(Box)`
  ${props => props.selected ? css`
      box-shadow: 0 0 8px 2px ${props.theme.global.colors['accent-1']};
    ` : ''
  }
`

const StyledImage = styled(Image)`
  border-radius: 4px;
`

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
  
  const thumbnailWidth = Math.round(THUMBNAIL_ASPECT_RATIO * 50)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x50/${src.slice(8)}`
  
  return (
    <StyledBox
      align='center'
      background={background}
      border={border}
      direction='row'
      justify='between'
      height='100%'
      pad={{
        right: '10px',
        vertical: '5px'
      }}
      selected={selected}
    >
      <Button
        ref={choiceButton}
        aria-checked={ariaChecked}
        disabled={disabled}
        fill='horizontal'
        label={
          <Box
            align='center'
            direction='row'
            forwardedAs='span'
          >
            {thumbnailSize !== 'none' && src &&
              <StyledImage
                alt=''
                height='50'
                src={thumbnailSrc}
                width={thumbnailSize === 'small' ? '50' : '60'}
              />}
            <Text
              color={textColor}
              margin={{ left: '10px', vertical: '5px' }}
              size='1rem'
            >
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
      {selected ? (
        <CloseButton
          closeFn={handleDelete}
          disabled={disabled}
        />
      ) : null}
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
// export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
