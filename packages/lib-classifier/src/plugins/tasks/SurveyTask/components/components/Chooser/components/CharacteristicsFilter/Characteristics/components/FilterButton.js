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
    valueImageSrc,
    valueLabel
  } = props

  const backgroundColor = checked ? 'accent-2' : 'neutral-6'

  return (
    <StyledFilter
      align='center'  
      background={{ color: backgroundColor }}
      height='40px'
      justify='center'
      margin={{
        bottom: 'xsmall'
      }}
      round='full'
      width='40px'
    >
      <Media
        alt={valueLabel}
        height='25'
        src={valueImageSrc}
        width='25'
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
  valueImageSrc: '',
  valueLabel: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  onFilter: PropTypes.func,  
  valueImageSrc: PropTypes.string,
  valueLabel: PropTypes.string
}
