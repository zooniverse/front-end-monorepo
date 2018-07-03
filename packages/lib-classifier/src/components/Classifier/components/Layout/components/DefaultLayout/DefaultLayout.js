import React from 'react'
import SubjectViewer from '../../../SubjectViewer'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
`

function DefaultLayout () {
  return (
    <Grid>
      <SubjectViewer />
    </Grid>
  )
}

export default DefaultLayout
