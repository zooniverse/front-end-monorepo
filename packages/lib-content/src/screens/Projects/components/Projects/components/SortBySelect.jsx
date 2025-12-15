import {
  Box,
  Select as GrommetSelect,
  ResponsiveContext,
  ThemeContext
} from 'grommet'
import { useContext } from 'react'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'

const DEFAULT_HANDLER = () => true

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
`

const StyledLabel = styled(SpacedText)`
  margin-right: 8px;
  font-size: 0.875rem;

  // Visually hidden but remain in the accessibility tree
  @media (max-width: 768px) {
    position: absolute;
    opacity: 0;
  }
`

function SortBySelect({ setSort = DEFAULT_HANDLER, value = '-launch_date' }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)

  const options = [
    { label: t('Projects.sortBy.newest'), value: '-launch_date' },
    { label: t('Projects.sortBy.oldest'), value: 'launch_date' },
    { label: t('Projects.sortBy.nameAZ'), value: 'display_name' },
    { label: t('Projects.sortBy.nameZA'), value: '-display_name' },
    { label: t('Projects.sortBy.mostActive'), value: '-activity' },
    { label: t('Projects.sortBy.mostPopular'), value: '-classifiers_count' }
  ]

  function handleSelect(option) {
    setSort(option.value)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <Box direction='row' align='center' justify={size === 'small' ? 'start' : 'end'}>
        <label>
          <StyledLabel htmlFor='sort-by-projects-page'>
            {t('Projects.sortBy.label')}:
          </StyledLabel>
        </label>
        <StyledSelect
          id='sort-by-projects-page'
          name='Sort By'
          labelKey='label'
          onChange={({ option }) => handleSelect(option)}
          options={options}
          size='medium'
          value={value}
          valueKey={{ key: 'value', reduce: true }}
        />
      </Box>
    </ThemeContext.Extend>
  )
}

export default SortBySelect
