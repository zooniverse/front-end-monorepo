import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { Media } from '@zooniverse/react-components'

export default function FilterButton (props) {
  const { value, valueImageSrc } = props

  return (
    <Button
      label={
        <Box>
          <Media
            height='20'
            src={valueImageSrc}
            width='20'
          /> 
        </Box>
      }
      size='small'
    />
  )
}

FilterButton.defaultProps = {
  value: {},
  valueImageSrc: ''
}

FilterButton.propTypes = {
  value: PropTypes.object,
  valueImageSrc: PropTypes.string
}
