import { Box, Paragraph, Text } from 'grommet'
import { number, object, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import CompletionBar from './components/CompletionBar'
import ContentBox from '../ContentBox'
import Stat from './components/Stat'

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;

  @media (min-width: 678px) {
    // Grommet small breakpoint
    grid-template-rows: 1fr;
    grid-template-columns: 50% auto;
    column-gap: 10px;
  }
`

const NumbersGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;

  @media (max-width: 679px) {
    // Grommet small breakpoint
    margin-top: 20px;
    column-gap: 0;
  }
`

const StyledParagraph = styled(Paragraph)`
  line-height: 22px;
  max-width: 100%;
`

const dateStringOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

function ProjectStatistics({
  className,
  classifications,
  completedSubjects,
  completeness,
  launchDate = null,
  linkProps,
  projectName,
  subjects,
  volunteers
}) {
  const { t } = useTranslation('components')
  const { locale } = useRouter()
  const sanitizedLocale = locale === 'test' ? 'en': locale

  const date = launchDate ? new Date(launchDate).toLocaleDateString(
    sanitizedLocale,
    dateStringOptions
  ) : null

  return (
    <ContentBox
      className={className}
      linkLabel={t('ProjectStatistics.viewMoreStats')}
      linkProps={linkProps}
      title={t('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <Box>
          <StyledParagraph size='medium'>
            {t('ProjectStatistics.text', { projectName })}
          </StyledParagraph>
          <CompletionBar completeness={completeness} />
          <Box
            direction='row'
            justify='between'
            align='center'
            pad={{ top: 'xsmall' }}
          >
            <Text size='0.75rem'>
              {launchDate === null
                ? t('ProjectStatistics.notLaunched')
                : t('ProjectStatistics.launched', { date })}
            </Text>
            <Text size='0.625rem'>
              {t('ProjectStatistics.percentComplete')}
            </Text>
          </Box>
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
  launchDate: string,
  linkProps: object.isRequired,
  projectName: string,
  subjects: number.isRequired,
  volunteers: number.isRequired
}

export default ProjectStatistics
