import { Box } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
import ClearFilters from './components/CharacteristicsFilter/ClearFilters'
import getFilteredChoiceIds from './helpers/getFilteredChoiceIds'

function Chooser({
  autoFocus = false,
  disabled = false,
  filters = {},
  handleDelete = () => {},
  handleFilter = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task
}) {
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)

  return (
    <Box>
      <FilterStatus
        disabled={disabled}
        filters={filters}
        handleFilter={handleFilter}
        task={task}
      />
      <Choices
        autoFocus={autoFocus}
        disabled={disabled}
        filteredChoiceIds={filteredChoiceIds}
        handleDelete={handleDelete}
        onChoose={onChoose}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
      <ClearFilters
        handleFilter={handleFilter}
        showingChoices={filteredChoiceIds.length}
        totalChoices={task.choicesOrder?.length}
      />
    </Box>
  )
}

Chooser.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  handleDelete: PropTypes.func,
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

export default observer(Chooser)
