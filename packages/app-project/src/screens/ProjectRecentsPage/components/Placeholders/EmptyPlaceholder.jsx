import { Box, Heading, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

const StyledTitle = styled(Heading)`
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  line-height: normal;
`

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
        <StyledTitle
          color={{ dark: 'light-1', light: 'dark-4' }}
          level={2}
          margin='none'
          textAlign='center'
        >
          {t('ProjectRecents.emptyTitle')}
        </StyledTitle>
        <Paragraph margin='none' textAlign='center'>
          {t('ProjectRecents.empty')}
        </Paragraph>
      </Box>
    </Box>
  )
}

export default EmptyPlaceholder
