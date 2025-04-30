import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { useTranslation, Trans } from '../../../../translations/i18n.js'

import { ContentBox } from '@components/shared'
import SubjectCard from '../SubjectCard/SubjectCard.js'

const StyledBox = styled(Box)`
  list-style: none;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
`

function RecentSubjects({
  isLoading = false,
  recents = [],
  error = undefined
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <ContentBox
      title='Recent Classifications'
      titleId='recent-subjects'
      screenSize={size}
    >
      {isLoading && (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      )}
      {!isLoading && error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>
            {t('UserHome.RecentSubjects.error')}
          </SpacedText>
        </Box>
      )}
      {!isLoading && !recents?.length && !error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>{t('UserHome.RecentSubjects.noSubjects')}</SpacedText>
          <Text>
            <Trans
                i18nKey='UserHome.RecentProjects.start' // same message in this component too
                components={[
                  <Anchor
                    key='projects-page'
                    href='https://www.zooniverse.org/projects'
                  />
                ]}
              />
          </Text>
        </Box>
      )}
      {!isLoading && recents?.length
        ? (
          <StyledBox
            aria-labelledby='recent-subjects'
            forwardedAs='ul'
            direction='row'
            gap='small'
            pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
            overflow={{ horizontal: 'auto' }}
            tabIndex={0}
            margin='0'
          >
            {recents.map(recent => {
              const subjectMedia = recent?.locations?.map(
                location => Object.values(location)[0]
              )
              return (
                <li key={recent?.id}>
                  <SubjectCard
                    size={size}
                    subjectID={recent?.links.subject}
                    mediaSrc={subjectMedia?.[0]}
                    projectSlug={recent?.projectSlug}
                  />
                </li>
              )
            })}
          </StyledBox>
        ) : null}
    </ContentBox>
  )
}

export default RecentSubjects

RecentSubjects.propTypes = {
  isLoading: bool,
  recents: arrayOf(
    shape({
      id: string,
      slug: string
    })
  )
}
