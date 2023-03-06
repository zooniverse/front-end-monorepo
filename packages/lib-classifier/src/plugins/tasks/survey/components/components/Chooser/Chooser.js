import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
import ClearFilters from './components/CharacteristicsFilter/ClearFilters'
import getFilteredChoiceIds from './helpers/getFilteredChoiceIds'

const StyledText = styled(Text)`
  display: block;
  margin: 10px 0;
`

function Chooser ({
  disabled = false,
  filters = {},
  previousChoiceId = '',
  handleDelete = () => {},
  handleFilter = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task
}) {
  const [filterDropOpen, setFilterDropOpen] = useState(false)

  function clearFilters() {
    handleFilter()
  }

  function handleFilterDropClose () {
    setFilterDropOpen(false)
  }

  function handleFilterDropOpen () {
    setFilterDropOpen(true)
  }

  const components = {
    a: StyledText,
    h1: StyledText,
    h2: StyledText,
    h3: StyledText,
    h4: StyledText,
    h5: StyledText,
    h6: StyledText,
    p: StyledText,
    span: Text
  }

  const showFilters = Object.keys(task.characteristics).length > 0
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)
  
  return (
    <Box>
      {task.instruction 
        ? <Markdownz components={components}>{task.instruction}</Markdownz>
        : null}
      {showFilters
        ? (<FilterStatus
            disabled={disabled}
            filterDropOpen={filterDropOpen}
            filters={filters}
            handleFilter={handleFilter}
            handleFilterDropClose={handleFilterDropClose}
            handleFilterDropOpen={handleFilterDropOpen}
            task={task}
           />)
        : null}
      <Choices
        disabled={disabled}
        filteredChoiceIds={filteredChoiceIds}
        filterDropOpen={filterDropOpen}
        previousChoiceId={previousChoiceId}
        handleDelete={handleDelete}
        onChoose={onChoose}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
      {showFilters
        ? (<ClearFilters
            onClick={clearFilters}
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
  previousChoiceId: PropTypes.string,
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
