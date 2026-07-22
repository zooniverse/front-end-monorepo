import { SubjectCard } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { array, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'

const StyledBox = styled(Box)`
  list-style: none;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
`

function RecentSubjects({
  login = undefined,
  projectId = undefined,
  recents = [],
  slug,
  userId = undefined
}) {
  const { t } = useTranslation('screens')
  const isEmpty = recents?.length === 0
  const justify = recents?.length < 4 ? 'start' : 'between'

  return (
    <ContentBox
      title={t('Classify.RecentSubjects.title')}
      titleId='recent-subjects'
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
        <StyledBox
          aria-labelledby='recent-subjects'
          forwardedAs='ul'
          direction='row'
          gap='small'
          justify={justify}
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
          overflow={{ horizontal: 'auto' }}
          tabIndex={0}
          margin='0'
        >
          {recents.map(recent => (
            <li key={recent?.subjectId}>
              <SubjectCard
                login={login}
                projectId={projectId}
                projectSlug={slug}
                size='medium'
                subject={recent.subject}
                userId={userId}
              />
            </li>
          ))}
        </StyledBox>
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
  /** Project URL slug for links. */
  slug: string.isRequired,
  /** Current user ID */
  userId: string
}

export default RecentSubjects
