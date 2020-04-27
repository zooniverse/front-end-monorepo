import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.span`
  display: flex;
  justify-content: center;
`

export default function ResizeIcon (props) {
  return (
    <StyledWrapper {...props}>&#8690;</StyledWrapper>
  )
}