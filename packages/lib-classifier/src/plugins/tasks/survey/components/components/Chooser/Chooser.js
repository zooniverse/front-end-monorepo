import { Markdownz } from '@zooniverse/react-components'
import { AnnounceContext, Box, Text } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'
import getFilteredChoiceIds from './helpers/getFilteredChoiceIds'

const StyledText = styled(Text)`
  margin: 0 0 20px;
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
  const filterStatusRef = useRef(null)

  const announce = useContext(AnnounceContext)

  const showFilters = task.characteristics.size > 0
  const filteredChoiceIds = getFilteredChoiceIds(filters, task)

  useEffect(function announceFilteredChoiceCount () {
    announce(`Showing ${filteredChoiceIds.length} of ${task.choices.size} choices`, 'polite', 1000)
  }, [filteredChoiceIds?.length, task.choices?.size, announce])

  function handleFilterOpen () {
    setFilterOpen(!filterOpen)
    if (filterOpen) {
      filterStatusRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filterButtonHasFocus = filterStatusRef.current && filterStatusRef.current.contains(document.activeElement)

  return (
    <Box
      as={task.instruction ? 'fieldset' : 'div'}
      alignSelf='center'
      margin='0'
      pad='0'
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
            ref={filterStatusRef}
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
        filterOpen={filterOpen || filterButtonHasFocus}
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
