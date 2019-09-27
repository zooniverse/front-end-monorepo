import counterpart from 'counterpart'
import { Box, Grid, Paragraph } from 'grommet'
import { array, bool, number, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from '@shared/components/SubjectPreview'

counterpart.registerTranslations('en', en)

function RecentSubjects (props) {
  const { isLoggedIn, recents, projectName, size, slug } = props
  const height = (size === 1) ? '40vw' : '200px'

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
            <SubjectPreview
              height={height}
              key={recent.subjectId}
              isLoggedIn={isLoggedIn}
              subject={subject}
              slug={slug}
              width={'100%'}
            />
          )
        })}
        {[...Array(size - recents.length)].map((placeholder, i) => {
          return (
            <Box
              align='center'
              height={height}
              key={i}
              overflow="hidden"
              width={'100%'}
            >
              <img alt="" role='presentation' src='/static/subject-placeholder.png' />
            </Box>
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
