import { SubjectCard } from '@zooniverse/react-components'
import { Box, Grid } from 'grommet'
import { array, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

function RecentSubjects({
  login = undefined,
  projectId = undefined,
  recents = [],
  size = 'medium',
  slug,
  userId = undefined
}) {
  const { t } = useTranslation('screens')
  const isEmpty = recents?.length === 0
  const count = size === 'small' ? 1 : 3
  const displayedRecents = recents.slice(0, count)

  return (
    <ContentBox title={t('Classify.RecentSubjects.title')}>
      {isEmpty ? (
        <Box
          align='center'
          justify='center'
          fill
        >
          {t('Classify.RecentSubjects.noSubjects')}
        </Box>
      ) : (
          <Grid
            alignContent='stretch'
            columns={[`repeat(${count}, 1fr)`]}
            gap='small'
          >
            {displayedRecents.map(recent => (
              <SubjectCard
                key={recent.subjectId}
                login={login}
                projectId={projectId}
                projectSlug={slug}
                size={size}
                subject={recent.subject}
                userId={userId}
              />
            ))}
          </Grid>
      )}
    </ContentBox>
  )
}

RecentSubjects.propTypes = {
  /** Current user login. */
  login: string,
  /** Project ID */
  projectId: string,
  /** Recent classification subjects from Panoptes. */
  recents: array,
  /** ResponsiveContext size */
  size: string,
  /** Project URL slug for links. */
  slug: string.isRequired,
  /** Current user ID */
  userId: string
}

export default RecentSubjects
