import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedText } from '@zooniverse/react-components'

export default function ClearFilters (props) {
  const {
    handleFilter,
    showingChoices,
    totalChoices
  } = props

  return (
    <Box>
      <SpacedText>
        Showing {showingChoices} of {totalChoices}
      </SpacedText>
    </Box>
  )
}

ClearFilters.defaultProps = {
  handleFilter: () => {},
  showingChoices: 0,
  totalChoices: 0
}

ClearFilters.propTypes = {
  handleFilter: PropTypes.func,
  showingChoices: PropTypes.number,
  totalChoices: PropTypes.number
}
