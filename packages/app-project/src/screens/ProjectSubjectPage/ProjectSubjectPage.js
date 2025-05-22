import { Box, Grid, ResponsiveContext } from 'grommet'
import dynamic from 'next/dynamic'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import StandardLayout from '@shared/components/StandardLayout'

function ProjectSubjectPage({
  appLoadingState,
  subject,
  subjectID
}) {
  return (
    <StandardLayout>
      <Box pad="medium">
        <h1>Subject ID: {subjectID}</h1>
        <pre>
          <code>
            {JSON.stringify(subject, null, 2)}
          </code>
        </pre>
      </Box>
    </StandardLayout>
  )
}

ProjectSubjectPage.propTypes = {
  appLoadingState: string,
  subject: shape({
    id: string.isRequired
  }),
  subjectID: string.isRequired
}

export default ProjectSubjectPage
