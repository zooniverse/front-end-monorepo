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
        <Box
          direction='row'
          gap='small'
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
          overflow={{ horizontal: 'auto' }}
          tabIndex={0}
          margin='0'
        >
          {recents.map(recent => (
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
        </Box>
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
