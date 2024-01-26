import { Box, Select as GrommetSelect, ThemeContext } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'

import selectTheme from './theme'

const DEFAULT_HANDLER = () => {}

function Select ({
  id,
  name,
  setSelection = DEFAULT_HANDLER,
  options = []
}) {
    return (
      <ThemeContext.Extend value={selectTheme}>
        <Box
          width={{ max: '215px' }}
        >
          <GrommetSelect 
            id={id}
            name={name}
            defaultValue={options[0]}
            onChange={({ option }) => setSelection(option)}
            options={options}
            size='medium'
            style={{ textAlign: 'center' }}
          />
        </Box>
      </ThemeContext.Extend>
    )
}

Select.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  setSelection: func,
  options: arrayOf(
    shape({
      label: string,
      value: string
    })
  )
}

export default Select
