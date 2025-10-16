import { Box, Grid } from 'grommet'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'
import StandardLayout from '@shared/components/StandardLayout'

import SubjectMetadata from './components/SubjectMetadata'
import SearchBar from './components/SearchBar'
import SubjectTalkData from './components/SubjectTalkData'
import SubjectTalkViewer from './components/SubjectTalkViewer'

// based on the lib-classifier MaxWidth layout
export const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 
    'viewer search'
    'viewer talkData';
  grid-template-columns: auto 600px;
  grid-template-rows: min-content 1fr;
  height: minmax(300px, 90vh);
  max-height: 90vh;

  @media screen and (max-width: 1280px) {
    grid-gap: 1.25rem;
    grid-template-areas:
      'search'
      'viewer'
      'talkData';
    grid-template-columns: 100%;
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
            data-testid='viewer'
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
            data-testid='searchBar'
            style={{ gridArea: 'search' }}
          >
            <SearchBar projectSlug={projectSlug} />
          </Box>
          <Box
            data-testid='talkData'
            style={{ gridArea: 'talkData' }}
          >
            <SubjectTalkData
              login={login}
              projectId={projectId}
              projectSlug={projectSlug}
              subjectId={subjectId}
              userId={userId}
            />
          </Box>
        </ContainerGrid>
        <Box
          as='aside'
          gap='medium'
          width='min(100%, 90rem)'
        >
          <SubjectMetadata metadata={subject?.metadata} />
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
