import React from 'react'
import SubjectViewer from '../../../SubjectViewer'
import ImageToolbar from '../../../ImageToolbar'
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
  grid-gap: 2rem;

  @media (min-width: 700px) {
    grid-template-columns: 8fr 5fr;
  }
`

const ViewerGrid = styled.section`
  display: grid;
  grid-template-columns: auto 4.5rem;
  grid-template-areas: "subject toolbar"
`

const StyledSubjectViewer = styled(SubjectViewer)`
  grid-area: subject;
`

const StyledImageToolbar = styled(ImageToolbar)`
  grid-area: toolbar;
`

function DefaultLayout () {
  return (
    <ContainerGrid>
      <ViewerGrid>
        <StyledSubjectViewer />
        <StyledImageToolbar />
      </ViewerGrid>
      <Box {...boxStyles}>tasks</Box>
    </ContainerGrid>
  )
}

export default DefaultLayout
