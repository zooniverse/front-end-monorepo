import React from 'react'
import SubjectViewer from '../../../SubjectViewer'
import Toolbar from '../../../Toolbar'
import styled from 'styled-components'
import { Box } from 'grommet'

const boxStyles = {
  pad: 'medium',
  border: {
    color: 'lightGrey',
    side: 'all'
  }
}

const ContainerGrid = styled.div`
  display: grid;
  grid-gap: 20px;

  @media (min-width: 700px) {
    grid-template-columns: 8fr 5fr;
  }
`

const ViewerGrid = styled.div`
  display: grid;
  grid-template-columns: auto 72px;

`

function DefaultLayout () {
  return (
    <ContainerGrid>
      <ViewerGrid>
        <SubjectViewer />
        <Toolbar />
      </ViewerGrid>
      <Box {...boxStyles}>tasks</Box>
    </ContainerGrid>
  )
}

export default DefaultLayout
