import { Box, Grid, Paragraph } from 'grommet'
import { array, bool, number, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from '@shared/components/SubjectPreview'

const isServer = typeof window === 'undefined'

function Placeholder({ height }) {
  if (isServer) {
    return null
  }

  return (
    <Box
      align='center'
      justify='center'
      height={height}
      width='100%'
      round='8px'
      margin='xsmall'
      background={{
        image: `url(https://static.zooniverse.org/fem-assets/subject-placeholder.jpg)`,
        size: 'cover',
        position: 'center'
      }}
    />
  )
}

function RecentSubjects({
  isLoggedIn = false,
  recents = [],
  projectName,
  size = 3,
  slug
}) {
  const { t } = useTranslation('screens')
  const height = size === 1 ? '40vw' : '200px'
  const displayedRecents = recents.slice(0, size)
  const placeholders = [...Array(size - displayedRecents.length)]

  return (
    <ContentBox title={t('Classify.RecentSubjects.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {t('Classify.RecentSubjects.text')}
      </Paragraph>
      <Grid
        alignContent='stretch'
        columns={[`repeat(${size}, 1fr)`]}
        gap='small'
      >
        {displayedRecents.map(recent => {
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
              placeholder={<Placeholder height={height} />}
              subject={subject}
              slug={slug}
              width={'100%'}
            />
          )
        })}
        {placeholders.map((placeholder, i) => (
          <Placeholder key={i} height={height} />
        ))}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  /** Is the volunteer logged in, for favourites and collections. */
  isLoggedIn: bool,
  /** The project name. */
  projectName: string,
  /** Recent classification subjects from Panoptes. */
  recents: array,
  /** The number of previews to show. */
  size: number,
  /** Project URL slug for links. */
  slug: string.isRequired
}

export default RecentSubjects
