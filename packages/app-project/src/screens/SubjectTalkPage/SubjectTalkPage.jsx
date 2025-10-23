import { Box, Grid, Heading } from 'grommet'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'
import StandardLayout from '@shared/components/StandardLayout'

import AncillaryData from './components/AncillaryData'
import SubjectMetadata from './components/SubjectMetadata'
import SearchBar from './components/SearchBar'
import SubjectTalkData from './components/SubjectTalkData'
import SubjectTalkViewer from './components/SubjectTalkViewer'

const StyledBox = styled(Box)`
  gap: 30px;
  padding: 30px;

  @media screen and (max-width: 1280px) {
    background: ${props => props.theme.dark ? props.theme.global.colors['dark-3'] : props.theme.global.colors['neutral-6']};
    gap: 20px;
    padding: 20px;
  }
`

const StyledHeading = styled(Heading)`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin: 20px 0 0 0;

  @media screen and (min-width: 1280px) {
    display: none;
  }
`

// based on the lib-classifier MaxWidth layout
export const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 30px;
  grid-template-areas: 
    'viewer search'
    'viewer talkData';
  grid-template-columns: auto 600px;
  grid-template-rows: min-content 1fr;
  height: minmax(300px, 90vh);
  max-height: 90vh;

  @media screen and (max-width: 1280px) {
    grid-gap: 20px;
    grid-template-areas:
      'search'
      'viewer'
      'talkData';
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    height: auto;
    margin: 0;
    max-height: none;
    width: 100%;
  }
`

function SubjectTalkPage({
  login,
  projectDisplayName,
  projectId,
  projectSlug,
  subject,
  subjectId,
  userId
}) {
  const { t } = useTranslation('screens')

  return (
    <StandardLayout>
      <StyledBox
        align='center'
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
            <StyledHeading
              color={{ dark: 'light-1', light: 'dark-4' }}
              level={2}
            >
              {t('Home.ZooniverseTalk.RecentSubjects.subjectLabel', { id: subjectId })}
            </StyledHeading>
          </Box>
          <Box
            data-testid='talkData'
            style={{ gridArea: 'talkData' }}
          >
            <SubjectTalkData
              login={login}
              projectDisplayName={projectDisplayName}
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
          {subject?.attached_media?.length > 0 ? (
            <AncillaryData media={subject?.attached_media} />
          ) : null}
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
      </StyledBox>
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
