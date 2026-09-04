import { SpacedHeading } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function EmptyPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Box
      align='center'
      justify='center'
      fill
      pad={{ vertical: 'large', horizontal: 'medium' }}
    >
      <Box
        align='center'
        direction='column'
        gap='medium'
      >
        <SpacedHeading
          color={{ dark: 'light-1', light: 'dark-4' }}
          level={2}
          margin='none'
          size='1.5rem'
          textAlign='center'
          weight='normal'
        >
          {t('ProjectRecents.emptyTitle')}
        </SpacedHeading>
        <Paragraph margin='none' textAlign='center'>
          {t('ProjectRecents.empty')}
        </Paragraph>
      </Box>
    </Box>
  )
}

export default EmptyPlaceholder
