import { Box, DropButton } from 'grommet'
import { Filter } from 'grommet-icons'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

import Characteristics from '../Characteristics'

export default function FilterStatus (props) {
  const { task } = props
  const filterStatusRef = useRef()
  
  return (
    <Box
      ref={filterStatusRef}
      align='center'
      direction='row'
      fill='horizontal'
    >
      <DropButton
        icon={<Filter />}
        label='Filter'
        dropAlign={{
          left: 'left',
          top: 'bottom'
        }}
        dropContent={<Characteristics task={task} />}
        dropProps={{
          elevation: 'medium',
          stretch: 'align'
        }}
        dropTarget={filterStatusRef.current}
      />
    </Box>
  )
}

FilterStatus.propTypes = {
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
