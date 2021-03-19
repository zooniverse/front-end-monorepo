import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
import getFilteredChoiceIds from './helpers/getFilteredChoiceIds'

const StyledHorizontalRule = styled.hr`
  width: 100%;
`

export default function Chooser (props) {
  const {
    autoFocus,
    disabled,
    filters,
    handleFilter,
    onChoose,
    selectedChoiceIds,
    task
  } = props

  const filteredChoiceIds = getFilteredChoiceIds(filters, task)

  return (
    <Box>
      <FilterStatus
        filters={filters}
        handleFilter={handleFilter}
        task={task}
      />
      <StyledHorizontalRule />
      <Choices
        filteredChoiceIds={filteredChoiceIds}
        onChoose={onChoose}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
    </Box>
  )
}

Chooser.defaultProps = {
  autoFocus: false,
  disabled: false,
  filters: {},
  handleFilter: () => {},
  selectedChoiceIds: [],
  onChoose: () => {}
}

Chooser.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  handleFilter: PropTypes.func,
  onChoose: PropTypes.func,
  selectedChoiceIds: PropTypes.arrayOf(PropTypes.string),
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
