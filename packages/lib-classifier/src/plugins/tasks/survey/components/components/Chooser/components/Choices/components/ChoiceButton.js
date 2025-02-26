import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { useTranslation } from '@translations/i18n'

import DeleteButton from './DeleteButton'

export const THUMBNAIL_ASPECT_RATIO = 1.25

const StyledBox = styled(Box)`
  ${props => props.selected ? css`
      background: ${props.theme.global.colors['neutral-1']};
      border: 1px solid ${props.theme.global.colors['neutral-6']};
      box-shadow: 0 0 8px 2px ${props.theme.global.colors['accent-1']};
    ` : css`
      background: ${props.shadedBackground ? props.theme.global.colors[props.theme.dark ? 'dark-4' : 'light-1'] : props.theme.global.colors[props.theme.dark ? 'dark-5' : 'neutral-6']};
      // if the screen width is 430px or less the ChoiceButtons will be in 1 column regardless of shown choices and related columns count
      // and the ChoiceButton background color should alternate as follows
      @media (max-width: 430px) {
        background: ${(props.index % 2) ? props.theme.global.colors[props.theme.dark ? 'dark-5' : 'neutral-6'] : props.theme.global.colors[props.theme.dark ? 'dark-4' : 'light-1']};
      }
    `
  }
  color: ${props => props.selected ? props.theme.global.colors['neutral-6'] : props.theme.global.colors[props.theme.dark ? 'neutral-6' : 'neutral-7']};

  &:focus {
    border: 2px solid ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }
  
  &:hover {
    background: ${props => props.theme.global.colors['accent-1']};
    box-shadow: 0 0 8px 2px ${props => props.theme.global.colors['accent-1']};
    color: ${props => props.theme.global.colors['neutral-7']};
  }
`

const StyledButton = styled(Button)`
  box-shadow: none;
  flex-grow: 1;
  height: 100%;
  &:focus { 
    border: 2px solid ${props => props.theme.global.colors['accent-1']};
    box-shadow: none;
    outline: none;
  }
`

const StyledImage = styled(Image)`
  border-radius: 4px;
  object-fit: cover;
`

const StyledLabel = styled(Text)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

const DEFAULT_HANDLER = () => true

function ChoiceButton({
  choiceId = '',
  choiceLabel = '',
  disabled = false,
  hasFocus = false,
  index = 0,
  onChoose = DEFAULT_HANDLER,
  onDelete = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  selected = false,
  shadedBackground = false,
  src = '',
  tabIndex = -1,
  thumbnailSize = 'none'
}) {
  const { t } = useTranslation('plugins')

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
      a11yTitle={`${choiceLabel}` + (selected ? `; ${t('SurveyTask.ChoiceButton.identified')}` : '')}
      aria-haspopup='true'
      role='menuitem'
      align='center'
      direction='row'
      fill
      index={index}
      onKeyDown={disabled ? DEFAULT_HANDLER : handleKeyDown}
      pad={{
        right: '10px'
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
          {thumbnailSize === 'none' ? (
            <Box
              width='40px'
            />
          ) : (
            <StyledImage
              alt=''
              height='50px'
              src={thumbnailSrc}
              width={thumbnailSize === 'small' ? '50px' : '60px'}
            />
          )}
        </DeleteButton>
      ) : null}
      <StyledButton
        a11yTitle={t('SurveyTask.ChoiceButton.openSubmenu', { choiceLabel })}
        disabled={disabled}
        label={
          <Box
            as='span'
            align='center'
            direction='row'
            overflow='hidden'
          >
            {!selected && thumbnailSize !== 'none' && src &&
              <StyledImage
                alt=''
                height='50px'
                src={thumbnailSrc}
                width={thumbnailSize === 'small' ? '50px' : '60px'}
              />}
            <StyledLabel
              margin={{ left: '10px', vertical: '5px' }}
              size={thumbnailSize === 'small' ? '.875rem' : '1rem'}
              weight={selected ? 'bold' : 'normal'}
              wordBreak='break-word'
            >
              {choiceLabel}
            </StyledLabel>
          </Box>
        }
        margin={{ left: (selected && thumbnailSize !== 'none') ? '2px' : '0px' }}
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
  index: PropTypes.number,
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
