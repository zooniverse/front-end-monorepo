import Loader from '@zooniverse/react-components/Loader'
import { Box, Text } from 'grommet'
import { bool, number } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

import { COLLECTIONS_PAGE_SIZE } from '@helpers/collectionQueryParams'

function CollectionsResultCount({
  count = 0,
  isLoading = false,
  page = 1,
  pageSize = COLLECTIONS_PAGE_SIZE
}) {
  const { t } = useTranslation('screens')
  const total = Math.max(0, count)
  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, total)
  const range = total < pageSize ? total : `${rangeStart}-${rangeEnd}`

  return (
    <Box height={{ min: '20px' }} justify='center'>
      {isLoading ? (
        <Loader height='20px' width='20px' />
      ) : (
        <Text size='0.75rem'>
          {t('Collect.resultsCount', { range, total })}
        </Text>
      )}
    </Box>
  )
}

CollectionsResultCount.propTypes = {
  count: number,
  isLoading: bool,
  page: number,
  pageSize: number
}

export default CollectionsResultCount