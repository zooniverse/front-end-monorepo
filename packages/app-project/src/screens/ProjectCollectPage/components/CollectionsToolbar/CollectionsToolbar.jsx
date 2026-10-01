import { Box, Text } from 'grommet'
import { func, number, string } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

import CollectionsResultCount from '../CollectionsResultCount'
import CollectionsSortSelect from '../CollectionsSortSelect'
import MinSubjectsToggle from '../MinSubjectsToggle'

function CollectionsToolbar({
  count = 0,
  minSubjects = 2,
  onMinSubjectsChange,
  onSortChange,
  page = 1,
  sort = 'display_name'
}) {
  const { t } = useTranslation('screens')

  return (
    <Box
      align='end'
      alignSelf='center'
      direction='row'
      fill='horizontal'
      gap={{ column: '24px', row: '16px' }}
      justify='between'
      margin={{ bottom: 'small' }}
      width={{ max: '1210px' }}
      wrap
    >
      <CollectionsResultCount count={count} page={page} />
      <Box
        align='center'
        direction='row'
        gap='20px'
        justify='end'
        wrap
      >
        <MinSubjectsToggle
          checked={minSubjects >= 2}
          onChange={onMinSubjectsChange}
        />
        <Box align='center' direction='row' gap='xsmall'>
          <Text>{t('Collect.sortBy')}</Text>
          <CollectionsSortSelect onChange={onSortChange} value={sort} />
        </Box>
      </Box>
    </Box>
  )
}

CollectionsToolbar.propTypes = {
  count: number,
  minSubjects: number,
  onMinSubjectsChange: func.isRequired,
  onSortChange: func.isRequired,
  page: number,
  sort: string
}

export default CollectionsToolbar