import { Box, Grid } from 'grommet'
import { useTranslation } from 'next-i18next'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'
import StandardLayout from '@shared/components/StandardLayout'

import SubjectTalkViewer from './components/SubjectTalkViewer'
import SubjectTalkData from './components/SubjectTalkData'

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

const StyledTalkDataBox = styled(Box)`
  max-height: 90vh;
  min-height: 300px;

  @media screen and (max-width: 1280px) {
    max-height: auto;
    min-height: auto;
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
            height={{ max: '90vh' }}
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
          <StyledTalkDataBox
            data-testid='talkData'
            style={{ gridArea: 'talkData' }}
          >
            <SubjectTalkData
              login={login}
              projectId={projectId}
              subjectId={subjectId}
              userId={userId}
            />
          </StyledTalkDataBox>
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
