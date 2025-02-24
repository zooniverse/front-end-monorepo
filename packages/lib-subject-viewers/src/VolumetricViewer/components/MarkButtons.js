import { useEffect, useState } from 'react'
import { Revert } from 'grommet-icons'
import DeleteIcon from './DeleteIcon'
import styled from 'styled-components'

const StyledMarkButtons = styled.div`
  .icon {
    border-radius: 20px;
    height: 20px;
    padding: 10px;
    width: 20px;

    background-color: #FFFFFF;

    &.inactive {
      fill: #a5a6a9 !important;
      stroke: #a5a6a9 !important;
    }

    &.active {
      fill: #000;
      stroke: #000;
    }

    &.active:hover {
      background-color: #ADDDE0;
      fill: #fff;
      stroke: #fff;
    }

    &.active:active {
      background-color: #265B68;
      fill: #fff;
      stroke: #fff;
    }

    &:first-of-type {
      margin-right: 20px;
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

  function markUndo() {
    if (annotations.config.activeAnnotation === null) return

    annotations.actions.point.undo({ 
      index: annotations.config.activeAnnotation
    })
  }

  function markDelete() {
    if (annotations.config.activeAnnotation === null) return

    annotations.actions.annotation.remove({ 
      index: annotations.config.activeAnnotation
    })
  }

  return (
    <StyledMarkButtons>
      <Revert
        className={`icon ${isActive ? 'active' : 'inactive'}`}
        onClick={markUndo}
      />
      <DeleteIcon
        className={`icon ${isActive ? 'active' : 'inactive'}`}
        onClick={markDelete}
      />
    </StyledMarkButtons>
  )
}
