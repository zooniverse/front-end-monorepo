import { Box } from 'grommet'
import { func, number, string } from 'prop-types'

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
        <CollectionsSortSelect onChange={onSortChange} value={sort} />
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