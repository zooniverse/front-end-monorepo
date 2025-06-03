import { Media } from '@zooniverse/react-components'
import { Box, Grid } from 'grommet'
import { Bookmark, Favorite, ShareOption, SubtractCircle } from 'grommet-icons'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import ContentBox from '@shared/components/ContentBox'
import StandardLayout from '@shared/components/StandardLayout'

// based on the lib-classifier MaxWidth layout
const ContainerGrid = styled(Grid)`
  position: relative;
  grid-gap: 1.875rem;
  grid-template-areas: 'viewer talkData';
  grid-template-columns: minmax(auto, 100rem) 25rem;
  margin: auto;

  @media screen and (max-width: 1024px) {
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

function ProjectSubjectPage({
  subject,
  subjectID
}) {
  const subjectURLs = subject.locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]

  return (
    <StandardLayout>
      <Box
        align='center'
        gap='medium'
        pad='medium'
      >
        <ContainerGrid>
          <Box
            background={{
              dark: 'dark-3',
              light: 'white'
            }}
            style={{
              gridArea: 'viewer'
            }}
          >
            <Media
              alt={`subject ${subjectID}`}
              subject={subject}
              src={subjectURL}
            />
            {/* <MetaTools /> */}
            <Box
              direction='row'
              gap='small'
              justify='center'
              margin='small'
            >
              <Favorite />
              <Bookmark />
              <ShareOption />
              <SubtractCircle />
            </Box>
          </Box>
          <Box
            gap='small'
            style={{ gridArea: 'talkData' }}
          >
            {/* <TalkSearch /> */}
            <input type='text' placeholder='Search this project for tags, subjects, or @users' />
            {/* <TalkData /> */}
            <Box
              background={{
                dark: 'dark-3',
                light: 'white'
              }}
              height={{ min: '600px' }}
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
            title='Subject Metadata'
          />
          {/* <AncillaryData /> */}
          {/* <FeaturedCollections /> */}
          <ContentBox
            title='Featured in these Collections'
            linkLabel='See more'
            linkProps={{
              href: ''
            }}
          />
          {/* <RelatedSubjects /> */}
          <ContentBox
            title='Other subject being discussed'
          />
        </Box>
      </Box>
    </StandardLayout>
  )
}

ProjectSubjectPage.propTypes = {
  subject: shape({
    id: string.isRequired
  }),
  subjectID: string.isRequired
}

export default ProjectSubjectPage
