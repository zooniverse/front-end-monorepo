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
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const components = {
  a: Text,
  h1: Text,
  h2: Text,
  h3: Text,
  h4: Text,
  h5: Text,
  h6: Text,
  p: Text,
  span: Text
}

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

  const showFilters = task.characteristics.size > 0
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)
  
  return (
    <Box
      as={task.instruction ? 'fieldset' : 'div'}
      alignSelf='center'
      style={{ border: 'none' }}
      width={{ max: '498px' }}
    >
      {task.instruction 
        ? <StyledText as='legend' size='small'>
            <Markdownz components={components}>
              {task.instruction}
            </Markdownz>
          </StyledText>
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
