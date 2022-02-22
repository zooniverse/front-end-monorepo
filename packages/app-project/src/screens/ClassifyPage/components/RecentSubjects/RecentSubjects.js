import { Box, Grid, Paragraph } from 'grommet'
import getConfig from 'next/config'
import { array, bool, number, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'
import SubjectPreview from '@shared/components/SubjectPreview'

function RecentSubjects ({
  isLoggedIn = false,
  recents = [],
  projectName,
  size = 3,
  slug
}) {
  const { t } = useTranslation('screens')
  const height = (size === 1) ? '40vw' : '200px'
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderUrl = `${assetPrefix}/assets/subject-placeholder.png`
  const displayedRecents = recents.slice(0, size)

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
              placeholder={<img alt='' role='presentation' src={placeholderUrl} />}
              subject={subject}
              slug={slug}
              width={'100%'}
            />
          )
        })}
        {[...Array(size - displayedRecents.length)].map((placeholder, i) => {
          return (
            <Box
              align='center'
              justify='center'
              height={height}
              key={i}
              overflow='hidden'
              width={'100%'}
            >
              <img alt='' role='presentation' src={placeholderUrl} />
            </Box>
          )
        })}
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
