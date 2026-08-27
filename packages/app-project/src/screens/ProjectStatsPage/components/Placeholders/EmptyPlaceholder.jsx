import { Box, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function EmptyPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Box fill align='center' pad={{ vertical: 'large' }}>
      <Paragraph>{t('ProjectStats.BarChart.empty')}</Paragraph>
    </Box>
  )
}

export default EmptyPlaceholder
