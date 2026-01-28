import { Select as GrommetSelect, ResponsiveContext, ThemeContext } from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'

import { useTranslation } from '@translations/i18n'
import selectTheme from './selectTheme'

const DEFAULT_HANDLER = () => true

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.theme.dark ? 'white' : '#005D69')};
`

function StatusSelect({ handleProjectStatus = DEFAULT_HANDLER, value = 'live' }) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  const options = [
    { label: t('Projects.status.active'), value: 'live' },
    { label: t('Projects.status.paused'), value: 'paused' },
    { label: t('Projects.status.finished'), value: 'finished' },
    { label: t('Projects.status.all'), value: 'all'}
  ]

  function handleSelect(option) {
    handleProjectStatus(option.value)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <StyledSelect
        a11yTitle={t('Projects.status.label')}
        id='status-filter-projects-page'
        name='status'
        labelKey='label'
        onChange={({ option }) => handleSelect(option)}
        options={options}
        size='medium'
        width={size === 'small' ? '100%' : '180px'}
        value={value}
        valueKey={{ key: 'value', reduce: true }}
      />
    </ThemeContext.Extend>
  )
}

export default StatusSelect
