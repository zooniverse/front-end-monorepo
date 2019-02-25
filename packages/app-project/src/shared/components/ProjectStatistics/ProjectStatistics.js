import counterpart from 'counterpart'
import { Text, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import CompletionBar from './components/CompletionBar'
import MainGrid from './components/MainGrid'
import Stat from './components/Stat'
import Subtitle from './components/Subtitle'
import ContentBox from '../ContentBox'

counterpart.registerTranslations('en', en)

const NumbersGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

function ProjectStatistics ({
  classifications,
  completedSubjects,
  projectName,
  subjects,
  volunteers
}) {
  return (
    <ContentBox
      linkLabel={counterpart('ProjectStatistics.viewMoreStats')}
      linkUrl='#'
      title={counterpart('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <section>
          <Subtitle text={counterpart('ProjectStatistics.subtitle')} />
          <StyledParagraph margin={{ top: 'none' }} size='small'>
            {counterpart('ProjectStatistics.text')}
          </StyledParagraph>
          <CompletionBar />
          <Text
            margin={{ top: 'small' }}
            size='small'
            weight='bold'
          >
            {counterpart('ProjectStatistics.percentComplete')}
          </Text>
        </section>
        <section>
          <Subtitle
            text={counterpart('ProjectStatistics.byTheNumbers')}
            margin={{ bottom: 'small', top: 'none' }}
          />
          <NumbersGrid>
            <Stat
              value={volunteers}
              label={counterpart('ProjectStatistics.volunteers')}
            />
            <Stat
              value={classifications}
              label={counterpart('ProjectStatistics.classifications')}
            />
            <Stat
              value={subjects}
              label={counterpart('ProjectStatistics.subjects')}
            />
            <Stat
              value={completedSubjects}
              label={counterpart('ProjectStatistics.completedSubjects')}
            />
          </NumbersGrid>
        </section>
      </MainGrid>
    </ContentBox>
  )
}

ProjectStatistics.propTypes = {
  classifications: PropTypes.number.isRequired,
  completedSubjects: PropTypes.number.isRequired,
  subjects: PropTypes.number.isRequired,
  volunteers: PropTypes.number.isRequired
}

ProjectStatistics.defaultProps = {
  classifications: 0,
  completedSubjects: 0,
  subjects: 0,
  volunteers: 0
}

export default ProjectStatistics
