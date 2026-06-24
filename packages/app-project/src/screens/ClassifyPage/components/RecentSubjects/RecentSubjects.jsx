import { SubjectCard } from '@zooniverse/react-components'
import { Box, Grid } from 'grommet'
import { array, bool, number, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

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
  login = undefined,
  projectId = undefined,
  recents = [],
  size = 3,
  slug,
  userId = undefined
}) {
  const { t } = useTranslation('screens')
  const height = size === 1 ? '40vw' : '200px'
  const isEmpty = recents?.length === 0
  const displayedRecents = recents.slice(0, size)
  const placeholders = [...Array(size - displayedRecents.length)]
  const gridColumns = isEmpty ? ['1fr'] : [`repeat(${size}, 1fr)`]

  return (
    <ContentBox title={t('Classify.RecentSubjects.title')}>
      <Grid
        alignContent='stretch'
        columns={gridColumns}
        gap='small'
        height={isEmpty ? height : undefined}
      >
        {isEmpty ? (
          <Box
            align='center'
            justify='center'
            fill
          >
            {t('Classify.RecentSubjects.noSubjects')}
          </Box>
        ) : (
          <>
            {displayedRecents.map(recent => (
              <SubjectCard
                key={recent.subjectId}
                login={login}
                projectId={projectId}
                projectSlug={slug}
                size={size === 1 ? 'large' : 'medium'}
                subject={recent.subject}
                userId={userId}
              />
            ))}
            {placeholders.map((placeholder, i) => (
              <Placeholder key={i} height={height} />
            ))}
          </>
        )}
      </Grid>
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  /** Is the volunteer logged in, for favourites and collections. */
  isLoggedIn: bool,
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Recent classification subjects from Panoptes. */
  recents: array,
  /** The number of previews to show. */
  size: number,
  /** Project URL slug for links. */
  slug: string.isRequired,
  /** Current user ID */
  userId: string
}

export default RecentSubjects
