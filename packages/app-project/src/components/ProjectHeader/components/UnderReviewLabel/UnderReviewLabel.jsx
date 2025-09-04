import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'

export default function UnderReviewLabel () {
  const { t } = useTranslation('components')
  return (
    <SpacedText color='accent-1' size='small'>
      {t('ProjectHeader.UnderReviewLabel.underReview')}
    </SpacedText>
  )
}
