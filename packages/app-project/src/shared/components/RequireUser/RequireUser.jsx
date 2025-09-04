import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'

export default function RequireUser() {
  const { t } = useTranslation('components')

  return (
    <Box
      align='center'
      fill
      justify='center'
    >
      {t('RequireUser.text')}
    </Box>
  )
}
