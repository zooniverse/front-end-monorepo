import { Box, Paragraph, Text } from 'grommet'
import { number, object, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import CompletionBar from './components/CompletionBar'
import ContentBox from '../ContentBox'
import Stat from './components/Stat'

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;

  @media (min-width: 678px) { // Grommet small breakpoint
    grid-template-rows: 1fr;
    grid-template-columns: 50% auto;
  }
`

const NumbersGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;

  @media (max-width: 679px) { // Grommet small breakpoint
    margin-top: 20px;
  }
`

const StyledParagraph = styled(Paragraph)`
  line-height: 22px;
  max-width: 100%;
`

function ProjectStatistics({
  className,
  classifications,
  completedSubjects,
  completeness,
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
        <Box>
          <StyledParagraph
            size='medium'
            margin={{ vertical: '20px' }}
          >
            {t('ProjectStatistics.text', { projectName })}
          </StyledParagraph>
          <CompletionBar completeness={completeness} />
          <Text margin={{ top: 'xsmall' }} size='0.625rem' >
            {t('ProjectStatistics.percentComplete')}
          </Text>
        </Box>
        <NumbersGrid>
          <Stat value={volunteers} label={t('ProjectStatistics.volunteers')} />
          <Stat
            value={classifications}
            label={t('ProjectStatistics.classifications')}
          />
          <Stat value={subjects} label={t('ProjectStatistics.subjects')} />
          <Stat
            value={completedSubjects}
            label={t('ProjectStatistics.completedSubjects')}
          />
        </NumbersGrid>
      </MainGrid>
    </ContentBox>
  )
}

ProjectStatistics.propTypes = {
  className: string,
  classifications: number.isRequired,
  completedSubjects: number.isRequired,
  completeness: number,
  linkProps: object.isRequired,
  projectName: string,
  subjects: number.isRequired,
  volunteers: number.isRequired
}

export default ProjectStatistics
