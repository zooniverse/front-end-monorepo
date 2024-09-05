import { Box, Grid, Image, Paragraph } from 'grommet'
import { array, bool, number, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from '@shared/components/SubjectPreview'

const isServer = typeof window === 'undefined'

function Placeholder({ height, src }) {
  if (isServer) {
    return null
  }

  return (
    <Box
      align='center'
      justify='center'
      height={height}
      overflow='hidden'
      width={'100%'}
    >
      <Image alt='' height={358} role='presentation' src={src} width={500} />
    </Box>
  )
}

function RecentSubjects ({
  isLoggedIn = false,
  recents = [],
  projectName,
  size = 3,
  slug
}) {
  const { t } = useTranslation('screens')
  const height = (size === 1) ? '40vw' : '200px'
  const placeholderUrl = 'https://static.zooniverse.org/fem-assets/subject-placeholder.jpg'
  const displayedRecents = recents.slice(0, size)
  const placeholders = [...Array(size - displayedRecents.length)]
  const placeholder = <Image alt='' height={358} layout='responsive' role='presentation' src={placeholderUrl} width={500} />

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
              placeholder={placeholder}
              subject={subject}
              slug={slug}
              width={'100%'}
            />
          )
        })}
        {placeholders.map((placeholder, i) => (
          <Placeholder
            key={i}
            height={height}
            src={placeholderUrl}
            />
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
