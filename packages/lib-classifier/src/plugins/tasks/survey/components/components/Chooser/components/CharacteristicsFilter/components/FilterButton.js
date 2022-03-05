import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { CloseButton, Media } from '@zooniverse/react-components'

export const StyledFilter = styled(Box)`
  button {
    display: none;
  }

  &:focus > button, 
  &:hover > button {
    display: block;
    position: absolute;
  }

  &:hover {
    box-shadow: 0 0 2px 2px ${props => props.theme.global.colors.brand};
  }
`

export default function FilterButton (props) {
  const {
    characteristicId,
    checked,
    onFilter,
    buttonSize,
    valueImageSrc,
    valueLabel
  } = props

  const backgroundColor = checked ? 'accent-1' : 'neutral-6'
  const marginPerSize = buttonSize === 'small' ? 'none' : { bottom: 'xsmall' }
  const containerSize = buttonSize === 'small' ? '30px' : '40px'
  const mediaSize = buttonSize === 'small' ? '18px' : '25px'

  return (
    <StyledFilter
      align='center'
      background={{ color: backgroundColor }}
      height={containerSize}
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
  onFilter: () => {},
  buttonSize: 'medium',
  valueImageSrc: '',
  valueLabel: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  onFilter: PropTypes.func,
  buttonSize: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
