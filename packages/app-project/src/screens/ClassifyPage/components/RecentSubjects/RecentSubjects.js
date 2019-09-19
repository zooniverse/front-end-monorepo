import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { array, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from './components/SubjectPreview'

counterpart.registerTranslations('en', en)

function RecentSubjects (props) {
  const { recents, projectName } = props

  return (
    <ContentBox title={counterpart('RecentSubjects.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('RecentSubjects.text')}
      </Paragraph>
      <Grid
        columns={['1fr', '1fr', '1fr']}
        gap="small"
      >
        {recents.map(({ subjectId, locations }) => <SubjectPreview key={subjectId} subjectId={subjectId} locations={locations} />)}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  projectName: string,
  recents: array
}

RecentSubjects.defaultProps = {
  recents: []
}

export default RecentSubjects
