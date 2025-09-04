import { Box, Grid } from 'grommet'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'
import StandardLayout from '@shared/components/StandardLayout'

import SubjectTalkViewer from './components/SubjectTalkViewer'

// based on the lib-classifier MaxWidth layout
export const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 'viewer talkData';
  grid-template-columns: auto 600px;

  @media screen and (max-width: 1280px) {
    grid-gap: 1.25rem;
    grid-template-areas:
      'viewer'
      'talkData';
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    margin: 0;
    width: 100%;
  }
`

function SubjectTalkPage({
  login,
  projectId,
  projectSlug,
  subject,
  subjectId,
  userId
}) {
  const { t } = useTranslation('screens')

  return (
    <StandardLayout>
      <Box
        align='center'
        gap='medium'
        pad='medium'
      >
        <ContainerGrid>
          <Box
            height={{ max: '90vh', min: '600px' }}
            style={{
              gridArea: 'viewer'
            }}
          >
            <SubjectTalkViewer
              login={login}
              projectId={projectId}
              projectSlug={projectSlug}
              subject={subject}
              userId={userId}
            />
          </Box>
          <Box
            gap='small'
            style={{ gridArea: 'talkData' }}
          >
            {/* <TalkSearch /> */}
            <input type='text' placeholder={t('Talk.searchPlaceholder')} />
            {/* <TalkData /> */}
            <Box
              background={{
                dark: 'dark-3',
                light: 'white'
              }}
            >
              Talk data goes here
            </Box>
          </Box>
        </ContainerGrid>
        <Box
          as='aside'
          gap='medium'
          width='min(100%, 90rem)'
        >
          {/* <MetaData /> */}
          <ContentBox
            title={t('Talk.subjectMetadata')}
          />
          {/* <AncillaryData /> */}
          {/* <FeaturedCollections /> */}
          <ContentBox
            title={t('Talk.featuredCollections')}
            linkLabel={t('Classify.YourStats.link')}
            linkProps={{
              href: ''
            }}
          />
          {/* <RelatedSubjects /> */}
          <ContentBox
            title={t('Talk.relatedSubjects')}
          />
        </Box>
      </Box>
    </StandardLayout>
  )
}

SubjectTalkPage.propTypes = {
  login: string,
  projectId: string,
  projectSlug: string,
  subject: shape({
    id: string.isRequired
  }),
  subjectId: string.isRequired,
  userId: string
}

export default SubjectTalkPage
