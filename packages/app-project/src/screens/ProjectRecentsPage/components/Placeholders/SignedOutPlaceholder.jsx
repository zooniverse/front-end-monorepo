import { Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function SignedOutPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Paragraph>{t('ProjectRecents.signedOut')}</Paragraph>
  )
}

export default SignedOutPlaceholder
