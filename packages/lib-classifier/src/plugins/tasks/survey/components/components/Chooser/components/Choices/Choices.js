import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { css, withTheme } from 'styled-components'

import howManyColumns from './helpers/howManyColumns'
import whatSizeThumbnail from './helpers/whatSizeThumbnail'
import ChoiceButton from './components/ChoiceButton'

const StyledGrid = styled.ul`
  ${props => props.theme.dark
    ? css`background-color: ${props.theme.global.colors['dark-1']};`
    : css`background-color: ${props.theme.global.colors['light-1']};`
  }
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2px;
  grid-template-rows: repeat(${props => props.rowsCount}, auto);
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const defaultTheme = {
  dark: false,
  global: {
    colors: {}
  }
}

export function Choices ({
  disabled = false,
  filteredChoiceIds = [],
  filterDropOpen = false,
  previousChoiceId = '',
  handleDelete = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task,
  theme = defaultTheme
}) {
  const [focusIndex, setFocusIndex] = useState(filteredChoiceIds.indexOf(previousChoiceId))

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
      role='menu'
      rowsCount={rowsCount}
    >
      {filteredChoiceIds.map((choiceId, index) => {
        const choice = task.choices?.[choiceId] || {}
        const selected = selectedChoiceIds.indexOf(choiceId) > -1
        const src = task.images?.[choice.images?.[0]] || ''
        const hasFocus = !filterDropOpen && (index === focusIndex)
        let tabIndex = -1
        if (focusIndex === -1 && index === 0) {
          tabIndex = 0
        } else if (focusIndex === index) {
          tabIndex = 0
        }

        return (
          <li
            key={choiceId}
            role="presentation"
          >
            <ChoiceButton
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
          </li>
        )
      })}
    </StyledGrid>
  )
}

Choices.propTypes = {
  disabled: PropTypes.bool,
  filteredChoiceIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  filterDropOpen: PropTypes.bool,
  previousChoiceId: PropTypes.string,
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
