import { CheckBox, ThemeContext } from 'grommet'
import { bool, func, string } from 'prop-types'

const DEFAULT_HANDLER = () => true

const subjectCheckboxTheme = {
  checkBox: {
    border: {
      color: 'white',
      width: '1px'
    },
    check: {
      extend: ({ checked, theme }) => `background-color: ${checked
        ? theme.global.colors['neutral-1']
        : 'rgba(255, 255, 255, 0.3)'};`,
      radius: '4px',
      thickness: '2px'
    },
    color: 'white',
    hover: {
      border: {
        color: 'white'
      }
    },
    size: '20px'
  }
}

function SubjectCheckbox({
  a11yTitle,
  checked = false,
  disabled = false,
  onChange = DEFAULT_HANDLER
}) {
  return (
    <ThemeContext.Extend value={subjectCheckboxTheme}>
      <CheckBox
        a11yTitle={a11yTitle}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </ThemeContext.Extend>
  )
}

SubjectCheckbox.propTypes = {
  a11yTitle: string.isRequired,
  checked: bool,
  disabled: bool,
  onChange: func
}

export default SubjectCheckbox
