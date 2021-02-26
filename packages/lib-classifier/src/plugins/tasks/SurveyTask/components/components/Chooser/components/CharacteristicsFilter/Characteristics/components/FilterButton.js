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
`

export default function FilterButton (props) {
  const {
    characteristicId,
    checked,
    onFilter,
    size,
    valueImageSrc,
    valueLabel
  } = props

  const backgroundColor = checked ? 'accent-2' : 'neutral-6'
  const marginPerSize = size === 'small' ? 'none' : { bottom: 'xsmall' }
  const containerSize = size === 'small' ? '30px' : '40px'
  const mediaSize = size === 'small' ? '18' : '25'

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
  size: 'medium',
  valueImageSrc: '',
  valueLabel: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  onFilter: PropTypes.func,
  size: PropTypes.string,
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
