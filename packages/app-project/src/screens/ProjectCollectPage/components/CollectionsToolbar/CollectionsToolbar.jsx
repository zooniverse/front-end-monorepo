import { Box } from 'grommet'
import { func, number, string } from 'prop-types'
import styled from 'styled-components'

import CollectionsResultCount from '../CollectionsResultCount'
import CollectionsSortSelect from '../CollectionsSortSelect'
import MinSubjectsToggle from '../MinSubjectsToggle'

const Toolbar = styled(Box)`
  align-items: flex-end;
  flex-direction: row;

  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column-reverse;
  }
`

const ToolbarControls = styled(Box)`
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

function CollectionsToolbar({
  count = 0,
  minSubjects = 2,
  onMinSubjectsChange,
  onSortChange,
  page = 1,
  sort = 'display_name'
}) {
  return (
    <Toolbar
      alignSelf='center'
      fill='horizontal'
      gap={{ column: '24px', row: '16px' }}
      justify='between'
      margin={{ bottom: 'small' }}
      width={{ max: '1210px' }}
      wrap
    >
      <CollectionsResultCount count={count} page={page} />
      <ToolbarControls gap='20px' wrap>
        <MinSubjectsToggle
          checked={minSubjects >= 2}
          onChange={onMinSubjectsChange}
        />
        <CollectionsSortSelect onChange={onSortChange} value={sort} />
      </ToolbarControls>
    </Toolbar>
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