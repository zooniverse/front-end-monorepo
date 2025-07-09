import { useEffect, useState } from 'react'
import { Revert } from 'grommet-icons'
import DeleteIcon from './DeleteIcon'
import MarkCreateIcon from './MarkCreateIcon'
import styled from 'styled-components'

const StyledMarkButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  button {
    background-color: #FFFFFF;
    border: none;
    border-radius: 30px;
    height: fit-content;
    margin-right: 10px;
    padding: 10px;
    width: fit-content;

    svg {
      width: 20px;
      height: 20px;
    }

    &.inactive svg {
      fill: #a5a6a9 !important;
      stroke: #a5a6a9 !important;
    }

    &.active svg {
      fill: #000;
      stroke: #000;
    }

    &.active:hover {
      background-color: #ADDDE0;

      svg {
        fill: #fff;
        stroke: #fff;
      }
    }

    &.active:active {
      background-color: #265B68;

      svg {
        fill: #fff;
        stroke: #fff;
      }
    }
  }
`

export const MarkButtons = ({ annotations }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    annotations.on('add:annotation', checkState)
    annotations.on('update:annotation', checkState)
    annotations.on('active:annotation', checkState)

    return () => {
      annotations.off('add:annotation', checkState)
      annotations.off('update:annotation', checkState)
      annotations.off('active:annotation', checkState)
    }
  }, [])

  function checkState() {
    setIsActive(annotations.config.activeAnnotation !== null)
  }

  function markCreate() {
    annotations.actions.annotation.inactive();
  }

  function markUndo() {
    if (annotations.config.activeAnnotation === null) return

    annotations.actions.point.undo({ 
      index: annotations.config.activeAnnotation
    })
  }

  function markDelete() {
    if (annotations.config.activeAnnotation === null) return

    if (window.confirm('Are you sure you would like to delete this mark? This action cannot be undone.')) {
      annotations.actions.annotation.remove({ 
        index: annotations.config.activeAnnotation
      })
    }
  }

  return (
    <StyledMarkButtons>
      <button
        aria-label='Add a new mark'
        className={isActive ? 'active' : 'inactive'}
        onClick={markCreate}
        title='Add a new mark'
      ><MarkCreateIcon /></button>

      <button
        aria-label='Undo last action on mark'
        className={isActive ? 'active' : 'inactive'}
        onClick={markUndo}
        title='Undo last action on mark'
      ><Revert /></button>

      <button
        aria-label='Delete last mark'
        className={isActive ? 'active' : 'inactive'}
        onClick={markDelete}
        title='Undo last action on mark'
      ><DeleteIcon /></button>
    </StyledMarkButtons>
  )
}
