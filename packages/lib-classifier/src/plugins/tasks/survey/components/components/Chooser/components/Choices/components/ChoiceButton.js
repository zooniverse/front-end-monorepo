import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { withThemeContext } from '@zooniverse/react-components'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

const StyledBox = styled(Box)`
  flex-direction: row;
  img {
    margin: 0 1ch 0 0;
  }

  @media (768px < width <= 1024px) {
    flex-direction: ${props => props.columnsCount === 1 ? 'row' : 'column'};

    img {
      margin: ${props => props.columnsCount === 1 ? '0 1ch 0 0' : '0'};
    }

    span {
      text-align: ${props => props.columnsCount === 1 ? 'left' : 'center'};
    }
  }

  @media (width <= 768px) {
    flex-direction: ${props => props.columnsCount === 3 ? 'column' : 'row'};

    img {
      margin: ${props => props.columnsCount === 3 ? '0' : '0 1ch 0 0'};
    }

    span {
      text-align: ${props => props.columnsCount === 3 ? 'center' : 'left'};
    }
  }
`

function ChoiceButton({
  ariaChecked = undefined,
  choiceId = '',
  choiceLabel = '',
  columnsCount = 1,
  disabled = false,
  hasFocus = false,
  onChoose = () => true,
  onKeyDown = () => true,
  role='button',
  selected = false,
  src = '',
  tabIndex = -1,
  thumbnailSize = 'none'
}) {
  const choiceButton = useRef(null)
  const handleClick = useCallback(() => {
    onChoose(choiceId)
  }, [choiceId, onChoose])
  const handleKeyDown = useCallback((event) => {
    onKeyDown(choiceId, event)
  }, [choiceId, onKeyDown])

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

  const thumbnailWidth = Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x${thumbnailHeight}/${src.slice(8)}`
  
  return (
    <Button
      ref={choiceButton}
      aria-checked={ariaChecked}
      disabled={disabled}
      fill
      label={
        <StyledBox
          align='center'
          columnsCount={columnsCount}
          fill
          forwardedAs='span'
        >
          {thumbnailSize !== 'none' && src &&
            <Image
              alt=''
              height='fill'
              src={thumbnailSrc}
              width={thumbnailWidth}
            />}
          <Text>
            {choiceLabel}
          </Text>
        </StyledBox>
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={role}
      selected={selected}
      size='small'
      tabIndex={tabIndex}
    />
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
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
