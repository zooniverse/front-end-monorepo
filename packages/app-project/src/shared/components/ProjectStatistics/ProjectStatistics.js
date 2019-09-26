import counterpart from 'counterpart'
import { Text, Paragraph } from 'grommet'
import { number, object, string } from 'prop-types'
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

const StyledParagraph = styled(Paragraph)`
  line-height: 22px;
  max-width: 100%;
`

function ProjectStatistics (props) {
  const {
    className,
    classifications,
    completedSubjects,
    linkProps,
    projectName,
    subjects,
    volunteers
  } = props

  return (
    <ContentBox
      className={className}
      linkLabel={counterpart('ProjectStatistics.viewMoreStats')}
      linkProps={linkProps}
      title={counterpart('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <section>
          <Subtitle text={counterpart('ProjectStatistics.subtitle')} />
          <StyledParagraph
            margin={{ bottom: 'small', top: 'none' }}
            size='medium'
          >
            {counterpart('ProjectStatistics.text', { projectName })}
          </StyledParagraph>
          <CompletionBar />
          <Text margin={{ top: 'small' }} size='small' weight='bold'>
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
  className: string,
  classifications: number.isRequired,
  completedSubjects: number.isRequired,
  linkProps: object.isRequired,
  projectName: string,
  subjects: number.isRequired,
  volunteers: number.isRequired
}

ProjectStatistics.defaultProps = {
  classifications: 0,
  completedSubjects: 0,
  subjects: 0,
  volunteers: 0
}

export default ProjectStatistics
