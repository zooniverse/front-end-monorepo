import { Box, Select as GrommetSelect, ThemeContext } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import selectTheme from './theme'

const StyledBox = styled(Box)`
  ${props =>
    props.open &&
    css`
      background: linear-gradient(to top, ${props.theme.global.colors.brand} 50%, transparent 50%);
    `}
` 

const DEFAULT_HANDLER = () => {}
const DEFAULT_VALUE = { label: '', value: '' }

function Select({
  id = '',
  name = '',
  handleChange = DEFAULT_HANDLER,
  options = [],
  value = DEFAULT_VALUE
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value)

  useEffect(() => {
    setSelected(value)
  }, [value])

  function handleSelect(option) {
    setSelected(option)
    handleChange(option)
  }

  function handleOpen() {
    setOpen(!open)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <ThemeContext.Extend value={selectTheme}>
      <StyledBox
        open={open}
        width={{ max: '215px' }}
      >
        <GrommetSelect
          a11yTitle={name}
          id={id}
          name={name}
          labelKey='label'
          onChange={({ option }) => handleSelect(option)}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          options={options}
          size='medium'
          style={{ textAlign: 'center' }}
          value={selected}
        />
      </StyledBox>
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
