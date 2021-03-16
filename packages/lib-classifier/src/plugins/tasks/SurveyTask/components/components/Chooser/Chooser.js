import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import FilterStatus from './components/CharacteristicsFilter/FilterStatus'
import Choices from './components/Choices'

const StyledHorizontalRule = styled.hr`
  width: 100%;
`

export default function Chooser (props) {
  const {
    autoFocus,
    disabled,
    task,
    onChoose
  } = props

  // TODO: refactor to filtered choices
  const unfilteredChoices = Array.from(task.choicesOrder)

  return (
    <Box>
      <FilterStatus
        task={task}
      />
      <StyledHorizontalRule />
      <Choices
        filteredChoices={unfilteredChoices}
        onChoose={onChoose}
        task={task}
      />
    </Box>
  )
}

Chooser.defaultProps = {
  autoFocus: false,
  disabled: false,
  onChoose: () => {}
}

Chooser.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChoose: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
