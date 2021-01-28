import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { CloseButton, Media } from '@zooniverse/react-components'

const StyledBox = styled(Box)`
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
    valueImageSrc
  } = props

  const backgroundColor = checked ? 'accent-2' : 'neutral-6'

  return (
    <StyledBox
      align='center'  
      background={{ color: backgroundColor }}
      height='40px'
      justify='center'
      round='full'
      width='40px'
    >
      <Media
        height='25'
        src={valueImageSrc}
        width='25'
      />
      {checked && (
        <CloseButton
          closeFn={() => onFilter(characteristicId, undefined)}
        />
      )}
    </StyledBox>
  )
}

FilterButton.defaultProps = {
  characteristicId: '',
  checked: false,
  onFilter: () => {},
  valueImageSrc: ''
}

FilterButton.propTypes = {
  characteristicId: PropTypes.string,
  checked: PropTypes.bool,
  onFilter: PropTypes.func,
  valueImageSrc: PropTypes.string
}
