import { useEffect, useState } from 'react'
import { Edit, Revert } from 'grommet-icons'
import DeleteIcon from './DeleteIcon'
import styled from 'styled-components'
import { IconActionButton } from '@zooniverse/react-components'

const StyledMarkButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  
  button {
      margin-right: 10px;
  }
`

export const MarkButtons = ({ annotations }) => {
  const [isDisabled, setIsDisabled] = useState(true)

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
    setIsDisabled(annotations.config.activeAnnotation === null)
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
      <IconActionButton
        a11yTitle='Add a new mark'
        disabled={isDisabled}
        icon={<Edit />}
        onClick={markCreate}
      />

      <IconActionButton
        a11yTitle='Undo last action on mark'
        disabled={isDisabled}
        icon={<Revert />}
        onClick={markUndo}
      />

      <IconActionButton
        a11yTitle='Delete last mark'
        disabled={isDisabled}
        icon={<DeleteIcon />}
        onClick={markDelete}
      />
    </StyledMarkButtons>
  )
}
