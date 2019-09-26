import counterpart from 'counterpart'
import { Grid, Paragraph } from 'grommet'
import { array, bool, number, string } from 'prop-types'
import React from 'react'

import en from './locales/en'

import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from '@shared/components/SubjectPreview'
import { Media as ResponsiveContent } from '@shared/components/Media'

counterpart.registerTranslations('en', en)

function RecentSubjects (props) {
  const { isLoggedIn, recents, projectName, size, slug } = props

  return (
    <ContentBox title={counterpart('RecentSubjects.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {counterpart('RecentSubjects.text')}
      </Paragraph>
      <Grid
        alignContent='stretch'
        columns={[`repeat(${size}, 1fr)`]}
        gap='small'
      >
        {recents.map(recent => {
          const subject = {
            favorite: recent.favorite,
            id: recent.subjectId,
            locations: recent.locations,
            toggleFavourite: recent.toggleFavourite
          }
          return (
            <>
              <ResponsiveContent at='default'>
                <SubjectPreview
                  height={'40vw'}
                  key={recent.subjectId}
                  isLoggedIn={isLoggedIn}
                  subject={subject}
                  slug={slug}
                  width={'100%'}
                />
              </ResponsiveContent>
              <ResponsiveContent greaterThan='default'>
                <SubjectPreview
                  height={'200px'}
                  key={recent.subjectId}
                  isLoggedIn={isLoggedIn}
                  subject={subject}
                  slug={slug}
                  width={'100%'}
                />
              </ResponsiveContent>
            </>
          )
        })}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  isLoggedIn: bool,
  projectName: string,
  recents: array,
  size: number,
  slug: string.isRequired
}

RecentSubjects.defaultProps = {
  isLoggedIn: false,
  recents: [],
  size: 3
}

export default RecentSubjects
