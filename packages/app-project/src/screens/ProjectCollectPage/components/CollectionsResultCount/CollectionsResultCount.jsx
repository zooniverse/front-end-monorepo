import { Text } from 'grommet'
import { number } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

import { COLLECTIONS_PAGE_SIZE } from '@helpers/collectionQueryParams'

function CollectionsResultCount({ count = 0, page = 1, pageSize = COLLECTIONS_PAGE_SIZE }) {
  const { t } = useTranslation('screens')
  const total = Math.max(0, count)
  const start = total > 0 ? ((page - 1) * pageSize) + 1 : 0
  const end = Math.min(page * pageSize, total)

  return (
    <Text
      size='0.75rem'
    >
      {t('Collect.resultsCount', { start, end, total })}
    </Text>
  )
}

CollectionsResultCount.propTypes = {
  count: number,
  page: number,
  pageSize: number
}

export default CollectionsResultCount