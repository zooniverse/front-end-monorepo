import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { CloseButton, Media } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

export const StyledFilter = styled(Box)`
  box-shadow: ${
    props => props.focus || props.hover ? 
      `0 0 2px 2px ${props.theme.global.colors.brand};` 
      : 'none'
  };

  button {
    position: absolute;
  }
`

export default function FilterButton (props) {
  const {
    buttonSize = 'medium',
    characteristicId = '',
    checked = false,
    focus = false,
    hover = false,
    onFilter = () => {},
    valueId = '',
    valueImageSrc = '',
    valueLabel = ''
  } = props

  const { t } = useTranslation('plugins')

  const backgroundColor = checked ? 'accent-1' : 'neutral-6'
  const marginPerSize = buttonSize === 'small' ? 'none' : { bottom: 'xsmall' }
  const containerSize = buttonSize === 'small' ? '30px' : '40px'
  const mediaSize = buttonSize === 'small' ? '18px' : '25px'

  return (
    <StyledFilter
      align='center'
      background={{ color: backgroundColor }}
      data-testid={`filter-${characteristicId}-${valueId}`}
      focus={focus}
      height={containerSize}
      hover={hover}
      justify='center'
      margin={marginPerSize}
      round='full'
      width={containerSize}
    >
      <Media
        alt={valueLabel}
        height={mediaSize}
        src={valueImageSrc}
        width={mediaSize}
      />
      {checked && (
        <CloseButton
          aria-label={t('SurveyTask.CharacteristicsFilter.removeFilter', { valueLabel })}
          closeFn={(event) => {
            // Note: preventDefault and stopPropagation are to prevent the radio button input click handler from firing and re-selecting the characteristic filter
            event.preventDefault()
            event.stopPropagation()
            onFilter(characteristicId)
          }}
        />
      )}
    </StyledFilter>
  )
}

FilterButton.propTypes = {
  buttonSize: PropTypes.string,
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  focus: PropTypes.bool,
  hover: PropTypes.bool,
  onFilter: PropTypes.func,
  valueId: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
