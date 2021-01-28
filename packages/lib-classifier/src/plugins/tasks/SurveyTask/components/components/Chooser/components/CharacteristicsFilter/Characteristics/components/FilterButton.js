import { Box, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { Media } from '@zooniverse/react-components'

export default function FilterButton (props) {
  const {
    checked,
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
    </Box>
  )
}

FilterButton.defaultProps = {
  checked: false,
  valueImageSrc: ''
}

FilterButton.propTypes = {
  checked: PropTypes.bool,
  valueImageSrc: PropTypes.string
}
