import counterpart from 'counterpart'
import { Text, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import CompletionBar from './components/CompletionBar'
import MainGrid from './components/MainGrid'
import Subtitle from './components/Subtitle'
import ContentBox from '../ContentBox'
import Stat from '../Stat'

counterpart.registerTranslations('en', en)

const NumbersGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`

function ProjectStatistics ({
  className,
  classifications,
  completedSubjects,
  projectName,
  projectSlug,
  subjects,
  volunteers
}) {
  return (
    <ContentBox
      className={className}
      linkLabel={counterpart('ProjectStatistics.viewMoreStats')}
      linkUrl={`/projects/${projectSlug}/stats`}
      title={counterpart('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <section>
          <Subtitle text={counterpart('ProjectStatistics.subtitle')} />
          <Paragraph margin={{ bottom: 'small', top: 'none' }}>
            {counterpart('ProjectStatistics.text')}
          </Paragraph>
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
