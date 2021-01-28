import { Box, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { CloseButton, Media } from '@zooniverse/react-components'

export default function FilterButton (props) {
  const {
    characteristicId,
    checked,
    onFilter,
    valueImageSrc
  } = props

  const backgroundColor = checked ? 'accent-2' : 'neutral-6'

  return (
    <Box
      background={{ color: backgroundColor }}
      height='40px'
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
    </Box>
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
