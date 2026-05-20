import { Box, Paragraph, Text } from 'grommet'
import { bool, number, object, string } from 'prop-types'
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
    grid-template-columns: min(678px, 50%) min(550px, 50%);
    justify-content: space-between;
  }
`

const NumbersGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  row-gap: 12px;

  @media (max-width: 679px) {
    // Grommet small breakpoint
    margin-top: 20px;
  }
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
  hideLink = false,
  launchDate = null,
  linkProps,
  projectName,
  subjects,
  titleLevel = 2,
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
      titleLevel={titleLevel}
      linkLabel={hideLink ?  null: t('ProjectStatistics.viewMoreStats')}
      linkProps={hideLink ? null : linkProps}
      title={t('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <Box>
          <Paragraph margin={{ top: 'none'}}>
            {t('ProjectStatistics.text', { projectName })}
          </Paragraph>
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
  hideLink: bool,
  launchDate: string,
  linkProps: object.isRequired,
  projectName: string,
  subjects: number.isRequired,
  titleLevel: number,
  volunteers: number.isRequired
}

export default ProjectStatistics
