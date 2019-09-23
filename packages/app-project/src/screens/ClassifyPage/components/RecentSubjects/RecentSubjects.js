import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { array, bool, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from './components/SubjectPreview'

counterpart.registerTranslations('en', en)

function RecentSubjects (props) {
  const { isLoggedIn, recents, projectName, slug } = props

  return (
    <ContentBox title={counterpart('RecentSubjects.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('RecentSubjects.text')}
      </Paragraph>
      <Grid
        alignContent="stretch"
        columns={recents.map(recent => '1fr')}
        gap="small"
      >
        {recents.map(recent => (
          <SubjectPreview
            key={recent.subjectId}
            isLoggedIn={isLoggedIn}
            subject={recent}
            slug={slug}
          />
        ))}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  isLoggedIn: bool,
  projectName: string,
  recents: array,
  slug: string.isRequired
}

RecentSubjects.defaultProps = {
  isLoggedIn: false,
  recents: []
}

export default RecentSubjects
