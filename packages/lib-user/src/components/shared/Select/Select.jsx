import { Select as GrommetSelect, ThemeContext } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import selectTheme from './theme'

const DEFAULT_HANDLER = () => {}
const DEFAULT_VALUE = { label: '', value: '' }

const StyledSelect = styled(GrommetSelect)`
  text-align: center;
  text-transform: uppercase;
`

function Select({
  id = '',
  name = '',
  handleChange = DEFAULT_HANDLER,
  options = [],
  value = DEFAULT_VALUE,
  ...props
}) {
  const [selected, setSelected] = useState(value)

  useEffect(() => {
    setSelected(value)
  }, [value])

  function handleSelect(option) {
    setSelected(option)
    handleChange(option)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <StyledSelect
        id={id}
        name={name}
        labelKey='label'
        onChange={({ option }) => handleSelect(option)}
        options={options}
        size='medium'
        value={selected.label}
        valueKey={{ key: 'label', reduce: true }}
        {...props}
      />
    </ThemeContext.Extend>
  )
}

Select.propTypes = {
  id: string,
  name: string,
  handleChange: func,
  options: arrayOf(
    shape({
      label: string,
      value: string
    })
  ),
  value: shape({
    label: string,
    value: string
  })
}

export default Select
