import styled from 'styled-components'

import LineControls from "./LineControls"

export default {
  title: 'Drawing tools / LineControls',
  component: LineControls
}

const StyledDiv = styled.div`
  position: relative;
`

const mark = {
  id: '',
  undo: () => true,
  redo: () => true,
  close: () => true
}

const onDelete = () => true;

export function Default() {
  return (
    <StyledDiv>
      <LineControls mark={mark} onDelete={onDelete} />
    </StyledDiv>
  )
}