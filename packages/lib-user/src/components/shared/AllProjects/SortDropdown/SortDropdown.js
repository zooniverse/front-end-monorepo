import { Select } from '@components/shared'
import { func, string } from 'prop-types'
import { useTranslation } from '../../../../translations/i18n.js'
import { Box, ResponsiveContext } from 'grommet'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'
import { useContext } from 'react'

const DEFAULT_VALUE = { label: '', value: '' }
const DEFAULT_HANDLER = () => true

const StyledLabel = styled(SpacedText)`
  font-weight: bold;
  margin-right: 10px;
  font-size: 0.875rem;
`

export default function SortDropdown({
  handleSortParam = DEFAULT_HANDLER,
  sortParam = DEFAULT_VALUE
}) {
  const { t } = useTranslation()
  const grommetSize = useContext(ResponsiveContext)

  const options = [
    { label: t('AllProjects.recent'), value: 'recent' },
    { label: t('AllProjects.top'), value: 'top' }
  ]

  return (
    <Box direction='row' align='center' justify={grommetSize === 'small' ? 'start' : 'end'}>
      <label>
        <StyledLabel htmlFor='sort-project-cards'>
          {t('AllProjects.sortBy')}:
        </StyledLabel>
      </label>
      <Select
        id='sort-project-cards'
        name='sort-project-cards'
        options={options}
        handleChange={handleSortParam}
        value={options.find(option => option.value === sortParam)}
      />
    </Box>
  )
}

SortDropdown.propTypes = {
  sortParam: string,
  handleSortParam: func
}
