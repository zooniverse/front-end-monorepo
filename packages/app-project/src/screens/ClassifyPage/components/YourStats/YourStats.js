import { Box, Grid, Paragraph } from 'grommet'
import { number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import DailyClassificationsChart from './components/DailyClassificationsChart'
import ContentBox from '@shared/components/ContentBox'
import Stat from '@shared/components/Stat'

function YourStats (props) {
  const { counts, projectName } = props
  const { t } = useTranslation('screens')

  return (
    <ContentBox title={t('Classify.YourStats.title', { projectName })}>
      <Paragraph margin={{ top: 'none' }}>
        {t('Classify.YourStats.text')}
      </Paragraph>
      <Box border={{ color: 'light-5', side: 'bottom' }} pad={{ bottom: 'small' }}>
        <Grid columns={['1fr', '1fr']} gap='small'>
          <Stat
            label={t('Classify.YourStats.todaysCount')}
            value={counts.today}
          />
          <Stat
            label={t('Classify.YourStats.totalCount')}
            value={counts.total}
          />
        </Grid>
      </Box>
      <Box pad={{ top: 'small' }}>
        <DailyClassificationsChart />
      </Box>
    </ContentBox>
  )
}

YourStats.propTypes = {
  counts: shape({
    today: number,
    total: number
  }),
  projectName: string
}

YourStats.defaultProps = {
  counts: {
    today: 0,
    total: 0
  }
}

export default YourStats
