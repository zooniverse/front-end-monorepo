import { Box, Paragraph, Text } from 'grommet'
import { bool, number, object, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SpacedHeading } from '@zooniverse/react-components'

import CompletionBar from './components/CompletionBar'
import ContentBox from '../ContentBox'
import Stat from './components/Stat'

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;

  @media (min-width: 678px) {
    grid-template-rows: 1fr;
    grid-template-columns: 250px auto;
    column-gap: 30px;
  }
`

const AllTimeBox = styled(Box)`
  margin-bottom: 30px;
  align-items: center;

  @media (min-width: 678px) {
    margin-bottom: 0;
    border-right: solid 1px ${props => props.theme.global.colors['light-5']};
  }
`

const AllTimeHeading = styled(SpacedHeading)`
  align-self: start;
  margin: 0 0 20px;

  @media (min-width: 678px) {
    margin: 0;
  }
`

const NumbersGrid = styled(Box)`
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
  flex-wrap: wrap;

  @media (min-width: 678px) {
    flex-direction: row;
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
  erasTotal,
  hideLink = false,
  launchDate = null,
  linkProps,
  projectName,
  subjects,
  volunteers
}) {
  const { t } = useTranslation('components')
  const { locale } = useRouter()
  const sanitizedLocale = locale === 'test' ? 'en' : locale

  const date = launchDate
    ? new Date(launchDate).toLocaleDateString(sanitizedLocale, dateStringOptions)
    : null

  return (
    <ContentBox
      className={className}
      linkLabel={hideLink ? null : t('ProjectStatistics.viewMoreStats')}
      linkProps={hideLink ? null : linkProps}
      title={t('ProjectStatistics.title', { projectName })}
    >
      <MainGrid>
        <AllTimeBox>
          <AllTimeHeading level={3}>{t('ProjectStatistics.allTime')}</AllTimeHeading>
          <Box gap='medium' height='100%' justify='center' margin={{ left: '-30px'}}>
            <Stat value={volunteers} label={t('ProjectStatistics.volunteers')} />
            <Stat value={erasTotal} label={t('ProjectStatistics.classifications')} />
          </Box>
        </AllTimeBox>
        <Box>
          <SpacedHeading level={3} margin='none'>
            {t('ProjectStatistics.active')}
          </SpacedHeading>
          <Paragraph margin={{ top: 'none' }}>
            {t('ProjectStatistics.text', { projectName })}
          </Paragraph>
          <CompletionBar completeness={completeness} />
          <Box direction='row' justify='between' align='center' pad={{ top: 'xsmall' }}>
            <Text size='0.75rem'>
              {launchDate === null
                ? t('ProjectStatistics.notLaunched')
                : t('ProjectStatistics.launched', { date })}
            </Text>
            <Text size='0.625rem'>{t('ProjectStatistics.percentComplete')}</Text>
          </Box>
          <NumbersGrid>
            <Stat value={classifications} label={t('ProjectStatistics.classifications')} />
            <Stat value={subjects} label={t('ProjectStatistics.subjects')} />
            <Stat value={completedSubjects} label={t('ProjectStatistics.completedSubjects')} />
          </NumbersGrid>
        </Box>
      </MainGrid>
    </ContentBox>
  )
}

ProjectStatistics.propTypes = {
  className: string,
  classifications: number.isRequired,
  completedSubjects: number.isRequired,
  completeness: number,
  erasTotal: number,
  erasError: string,
  erasIsLoadingOrValidating: bool,
  hideLink: bool,
  launchDate: string,
  linkProps: object.isRequired,
  projectName: string,
  subjects: number.isRequired,
  volunteers: number.isRequired
}

export default ProjectStatistics
