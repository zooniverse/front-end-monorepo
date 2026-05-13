import { Box, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import { useTranslation } from '@translations/i18n'

import { useTotalClassificationCount } from '../Stats/hooks.js'

/*
  We have to manually add some legacy (static) stats to the UI.
  These numbers are not included in the fetch response for
  total volunteers or classifications.
  https://github.com/zooniverse/Panoptes-Front-End/pull/7167
*/
const PREPANOPTES_COUNT = 25284786 // classifications
const OUROBOROS_USER_COUNT = 114576 // volunteers

const TARGET_CLASSIFICATIONS = 1000000000

export default function BillionClassificationsCountdown() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const numberFontSize = size !== 'small' ? '5rem' : '2.5rem'

  const { data: classifications, error, isLoading } = useTotalClassificationCount()
  const totalClassifications = classifications + PREPANOPTES_COUNT

  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  if (error || isLoading) return null
  
  return (
    <Box gap='medium'>
      <Text>Classifications to go: {classificationsToGo}</Text>
    </Box>
  )
}
