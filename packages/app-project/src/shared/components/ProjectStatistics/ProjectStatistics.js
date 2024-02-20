import { Text, Paragraph } from 'grommet'
import { number, object, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import CompletionBar from './components/CompletionBar'
import MainGrid from './components/MainGrid'
import Subtitle from './components/Subtitle'
import ContentBox from '../ContentBox'
import Stat from '../Stat'

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

function ProjectStatistics ({
	className,
	classifications,
	completedSubjects,
	linkProps,
	projectName,
	subjects,
	volunteers
}) {
  const { t } = useTranslation('components')

  return (
    <ContentBox
      className={className}
      linkLabel={t('ProjectStatistics.viewMoreStats')}
      linkProps={linkProps}
      title={t('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <section>
          <Subtitle text={t('ProjectStatistics.subtitle')} />
          <StyledParagraph
            margin={{ bottom: 'small', top: 'none' }}
            size='medium'
          >
            {t('ProjectStatistics.text', { projectName })}
          </StyledParagraph>
          <CompletionBar />
          <Text margin={{ top: 'small' }} size='small' weight='bold'>
            {t('ProjectStatistics.percentComplete')}
          </Text>
        </section>
        <section>
          <Subtitle
            text={t('ProjectStatistics.byTheNumbers')}
            margin={{ bottom: 'small', top: 'none' }}
          />
          <NumbersGrid>
            <Stat
              className="test-stat-project-statistics-volunteers"
              value={volunteers}
              label={t('ProjectStatistics.volunteers')}
            />
            <Stat
              className="test-stat-project-statistics-classifications"
              value={classifications}
              label={t('ProjectStatistics.classifications')}
            />
            <Stat
              className="test-stat-project-statistics-subjects"
              value={subjects}
              label={t('ProjectStatistics.subjects')}
            />
            <Stat
              className="test-stat-project-statistics-completed-subjects"
              value={completedSubjects}
              label={t('ProjectStatistics.completedSubjects')}
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

export default ProjectStatistics
