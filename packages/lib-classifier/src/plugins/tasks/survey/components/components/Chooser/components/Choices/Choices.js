import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled, { css, withTheme } from 'styled-components'

import howManyColumns from './helpers/howManyColumns'
import whatSizeThumbnail from './helpers/whatSizeThumbnail'
import ChoiceButton from './components/ChoiceButton'

const StyledGrid = styled.div`
  ${props => props.theme.dark
    ? css`background-color: ${props.theme.global.colors['dark-1']};`
    : css`background-color: ${props.theme.global.colors['light-1']};`
  }
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
  grid-template-rows: repeat(${props => props.rowsCount}, auto);
  width: 100%;
`

const defaultTheme = {
  dark: false,
  global: {
    colors: {}
  }
}
export function Choices({
  autoFocus = false,
  disabled = false,
  filteredChoiceIds = [],
  handleDelete = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task,
  theme = defaultTheme
}) {
  const [focusIndex, setFocusIndex] = useState(0)

  useEffect(() => {
    if (selectedChoiceIds.length > 0) {
      const lastSelectedIndex = filteredChoiceIds.indexOf(selectedChoiceIds[selectedChoiceIds.length - 1])
      if (lastSelectedIndex > -1) {
        setFocusIndex(lastSelectedIndex)
      } else {
        setFocusIndex(0)
      }
    } else {
      setFocusIndex(0)
    }
  }, [filteredChoiceIds, selectedChoiceIds])

  const columnsCount = howManyColumns(filteredChoiceIds)
  const rowsCount = Math.ceil(filteredChoiceIds.length / columnsCount)
  const thumbnailSize = task.alwaysShowThumbnails ? 'small' : whatSizeThumbnail(filteredChoiceIds)

  function handleKeyDown (choiceId, event) {
    const index = filteredChoiceIds.indexOf(choiceId)
    let newIndex
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        event.stopPropagation()

        newIndex = (index + 1) % filteredChoiceIds.length
        setFocusIndex(newIndex)
        return false
      }
      case 'ArrowUp': {
        event.preventDefault()
        event.stopPropagation()

        newIndex = index - 1
        if (newIndex === -1) {
          newIndex = filteredChoiceIds.length - 1
        }
        setFocusIndex(newIndex)
        return false
      }
      case 'Backspace':
      case 'Delete': {
        event.preventDefault()
        event.stopPropagation()

        handleDelete(choiceId)
        return false
      }
      default: {
        return true
      }
    }
  }

  return (
    <StyledGrid
      rowsCount={rowsCount}
    >
      {filteredChoiceIds.map((choiceId, index) => {
        const choice = task.choices?.[choiceId] || {}
        const selected = selectedChoiceIds.indexOf(choiceId) > -1
        const src = task.images?.[choice.images?.[0]] || ''
        const hasFocus = autoFocus && (index === focusIndex)
        const tabIndex = (index === focusIndex) ? 0 : -1

        return (
          <ChoiceButton
            key={choiceId}
            choiceId={choiceId}
            choiceLabel={task.strings.get(`choices.${choiceId}.label`)}
            disabled={disabled}
            hasFocus={hasFocus}
            onChoose={onChoose}
            onKeyDown={handleKeyDown}
            selected={selected}
            src={src}
            tabIndex={tabIndex}
            thumbnailSize={thumbnailSize}
          />
        )
      })}
    </StyledGrid>
  )
}

Choices.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  filteredChoiceIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  handleDelete: PropTypes.func,
  onChoose: PropTypes.func,
  selectedChoiceIds: PropTypes.arrayOf(PropTypes.string),
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  theme: PropTypes.shape({
    dark: PropTypes.bool,
    global: PropTypes.shape({
      colors: PropTypes.object
    })
  })
}

export default withTheme(observer(Choices))
