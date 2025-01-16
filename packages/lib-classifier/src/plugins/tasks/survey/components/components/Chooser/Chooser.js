import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
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

function Chooser({
  disabled = false,
  filters = {},
  previousChoiceId = '',
  handleDelete = () => {},
  handleFilter = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task
}) {
  const [filterOpen, setFilterOpen] = useState(false)

  const showFilters = task.characteristics.size > 0
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)

  function handleFilterOpen () {
    setFilterOpen(!filterOpen)
  }
  
  return (
    <Box
      as={task.instruction ? 'fieldset' : 'div'}
      alignSelf='center'
      margin='none'
      pad='none'
      style={{ border: 'none' }}
      width='100%'
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
            filterOpen={filterOpen}
            filters={filters}
            handleFilter={handleFilter}
            handleFilterOpen={handleFilterOpen}
            showingChoices={filteredChoiceIds.length}
            task={task}
          />)
        : null}
      <Choices
        disabled={disabled}
        filteredChoiceIds={filteredChoiceIds}
        filterOpen={filterOpen}
        previousChoiceId={previousChoiceId}
        handleDelete={handleDelete}
        onChoose={onChoose}
        selectedChoiceIds={selectedChoiceIds}
        task={task}
      />
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
    instruction: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default observer(Chooser)
