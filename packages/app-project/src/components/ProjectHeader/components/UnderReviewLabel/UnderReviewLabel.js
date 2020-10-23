import React from 'react'
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function UnderReviewLabel () {
  return (
    <SpacedText color='accent-2' size='small'>
      {counterpart('UnderReviewLabel.underReview')}
    </SpacedText>
  )
}