import { Box, Paragraph } from 'grommet'

function EmptyPlaceholder() {
  return (
    <Box fill align='center' pad={{ vertical: 'large' }}>
      <Paragraph>{t('ProjectStats.BarChart.empty')}</Paragraph>
    </Box>
  )
}

export default EmptyPlaceholder
