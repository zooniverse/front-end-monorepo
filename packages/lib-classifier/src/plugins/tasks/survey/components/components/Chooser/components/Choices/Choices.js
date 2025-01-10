import { ResponsiveContext } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react';
import styled from 'styled-components'

import {
  howManyColumns,
  shouldShadeBackground,
  whatSizeThumbnail
} from './helpers'

import ChoiceButton from './components/ChoiceButton'

const StyledGrid = styled.ul`
  background: ${props => props.theme.global.colors[props.theme.dark ? 'dark-3' : 'light-3']};
  display: grid;
  gap: ${props => props.$hideThumbnails ? '1px' : '0'};
  grid-auto-flow: column;
  grid-template-columns: repeat(${props => props.$columnsCount}, ${props => {
    if (props.$columnsCount === 3) return '166px';
    if (props.$columnsCount === 2) return '250px';
    return '1fr';
  }});
  grid-template-rows: repeat(${props => props.$rowsCount}, ${props => props.$hideThumbnails ? '40px' : '60px'});
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;

  @media (max-width: 70rem) {
    grid-template-columns: repeat(${props => props.$columnsCount}, 1fr);
  }

  @media (max-width: 430px) {
    display: block;
    li {
      display: block;
      width: 100%;
    }
  }
`

export function Choices ({
  disabled = false,
  filteredChoiceIds = [],
  filterDropOpen = false,
  previousChoiceId = '',
  handleDelete = () => {},
  onChoose = () => true,
  selectedChoiceIds = [],
  task
}) {
  // TODO: refactor focus to menuitem, with consideration for "selected" state with open submenu button and delete button
  const [focusIndex, setFocusIndex] = useState(filteredChoiceIds.indexOf(previousChoiceId))

  const size = useContext(ResponsiveContext)

  let columnsCount = howManyColumns(filteredChoiceIds)
  if (size === 'small' && columnsCount === 3) {
    columnsCount = 2
  }

  const rowsCount = Math.ceil(filteredChoiceIds.length / columnsCount)
  
  let thumbnailSize
  // if new survey task thumbnails property is undefined and legacy alwaysShowThumbnails is true, then show thumbnails to support legacy alwaysShowThumbnails functionality
  if (task.thumbnails === 'hide') {
    thumbnailSize = 'none'
  } else {
    thumbnailSize = whatSizeThumbnail(filteredChoiceIds)
  }

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
      case 'End': {
        event.preventDefault()
        event.stopPropagation()

        setFocusIndex(filteredChoiceIds.length - 1)
        return false
      }
      case 'Enter':
        event.preventDefault()
        event.stopPropagation()

        if (selectedChoiceIds.indexOf(choiceId) > -1) {
          return false
        }

        onChoose(choiceId)
        return false
      case 'Home':
        event.preventDefault()
        event.stopPropagation()

        setFocusIndex(0)
        return false
      case 'Space':
        event.preventDefault()
        event.stopPropagation()

        if (selectedChoiceIds.indexOf(choiceId) > -1) {
          return false
        }

        onChoose(choiceId)
        return false
      default: {
        return true
      }
    }
  }

  return (
    <StyledGrid
      role='menu'
      $columnsCount={columnsCount}
      $rowsCount={rowsCount}
      $hideThumbnails={thumbnailSize === 'none'}
    >
      {filteredChoiceIds.map((choiceId, index) => {
        const choice = task.choices?.get(choiceId) || {}
        const selected = selectedChoiceIds.indexOf(choiceId) > -1
        const src = task.images?.get(choice.images?.[0]) || ''
        const hasFocus = !filterDropOpen && (index === focusIndex)
        let tabIndex = -1
        if (focusIndex === -1 && index === 0) {
          tabIndex = 0
        } else if (focusIndex === index) {
          tabIndex = 0
        }
        const shadedBackground = shouldShadeBackground({ index, rowsCount })

        return (
          <li
            key={choiceId}
            role='presentation'
          >
            <ChoiceButton
              choiceId={choiceId}
              choiceLabel={task.strings.get(`choices.${choiceId}.label`)}
              disabled={disabled}
              hasFocus={hasFocus}
              onChoose={onChoose}
              onDelete={handleDelete}
              onKeyDown={handleKeyDown}
              selected={selected}
              shadedBackground={shadedBackground}
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
    thumbnails: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default observer(Choices)
