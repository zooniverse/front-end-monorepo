import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { CloseButton, Media } from '@zooniverse/react-components'

export const StyledFilter = styled(Box)`
  box-shadow: ${props => props.focus || props.hover ? `0 0 2px 2px ${props.theme.global.colors.brand};` : 'none'};
  
  button {
    display: none;
  }

  &:focus > button, 
  &:hover > button {
    display: block;
    position: absolute;
  }
`

export default function FilterButton (props) {
  const {
    characteristicId,
    checked,
    focus,
    hover,
    onFilter,
    buttonSize,
    valueImageSrc,
    valueLabel
  } = props

  const backgroundColor = checked ? 'accent-1' : 'neutral-6'
  const marginPerSize = buttonSize === 'small' ? 'none' : { bottom: 'xsmall' }
  const containerSize = buttonSize === 'small' ? '30px' : '40px'
  const mediaSize = buttonSize === 'small' ? '18px' : '25px'

  console.log(`${characteristicId}-${valueLabel} focus, hover`, focus, hover)

  return (
    <StyledFilter
      align='center'
      background={{ color: backgroundColor }}
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

FilterButton.defaultProps = {
  characteristicId: '',
  checked: false,
  focus: false,
  hover: false,
  onFilter: () => {},
  buttonSize: 'medium',
  valueImageSrc: '',
  valueLabel: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  focus: PropTypes.bool,
  hover: PropTypes.bool,
  onFilter: PropTypes.func,
  buttonSize: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
