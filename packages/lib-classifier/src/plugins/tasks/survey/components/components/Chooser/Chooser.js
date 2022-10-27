import { Box } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
import ClearFilters from './components/CharacteristicsFilter/ClearFilters'
import getFilteredChoiceIds from './helpers/getFilteredChoiceIds'

function Chooser ({
  disabled = false,
  filters = {},
  focusedChoiceId = '',
  handleDelete = () => {},
  handleFilter = () => {},
  handleFocusedChoice = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task
}) {
  const showFilters = Object.keys(task.characteristics).length > 0
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)
  
  return (
    <Box>
      {showFilters
        ? (<FilterStatus
            disabled={disabled}
            filters={filters}
            handleFilter={handleFilter}
            task={task}
           />)
        : null}
      <Choices
        disabled={disabled}
        filteredChoiceIds={filteredChoiceIds}
        focusedChoiceId={focusedChoiceId}
        handleDelete={handleDelete}
        handleFocusedChoice={handleFocusedChoice}
        onChoose={onChoose}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
      {showFilters
        ? (<ClearFilters
            handleFilter={handleFilter}
            showingChoices={filteredChoiceIds.length}
            totalChoices={task.choicesOrder?.length}
           />)
        : null}
    </Box>
  )
}

Chooser.propTypes = {
  disabled: PropTypes.bool,
  filters: PropTypes.objectOf(PropTypes.string),
  focusedChoiceId: PropTypes.string,
  handleDelete: PropTypes.func,
  handleFilter: PropTypes.func,
  handleFocusedChoice: PropTypes.func,
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
