import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { array, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from './components/SubjectPreview'

counterpart.registerTranslations('en', en)

function RecentSubjects (props) {
  const { recents, projectName, slug } = props

  return (
    <ContentBox title={counterpart('RecentSubjects.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('RecentSubjects.text')}
      </Paragraph>
      <Grid
        columns={['1fr', '1fr', '1fr']}
        gap="small"
      >
        {recents.map(recent => <SubjectPreview key={recent.subjectId} recent={recent} slug={slug} />)}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  projectName: string,
  recents: array,
  slug: string.isRequired
}

RecentSubjects.defaultProps = {
  recents: []
}

export default RecentSubjects
