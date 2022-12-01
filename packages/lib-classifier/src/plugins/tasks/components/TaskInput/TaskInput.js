import { memo } from 'react';
import PropTypes from 'prop-types'

import styled, { css, withTheme } from 'styled-components'
import { darken, lighten } from 'polished'
import { Text } from 'grommet'

import TaskInputLabel from './components/TaskInputLabel'

function getHoverStyles (props, active = false) {
  const { theme: { dark, global: { colors } } } = props
  if (dark) {
    const borderColor = active ? colors['accent-1'] : colors['light-1']
    const darkerBackgroundColor = darken(0.04, colors['neutral-1'])
    return css`
      background: ${darkerBackgroundColor};
      border: 2px solid ${borderColor};
      color: ${colors.text.dark};
    `
  } else {
    const gradientTop = lighten(0.05, colors['accent-1'])
    const gradientBottom = darken(0.11, colors['accent-1'])
    const borderTopColor = active ? colors.brand : gradientTop
    const borderBottomColor = active ? colors.brand : gradientBottom
    const borderRightColor = active ? colors.brand : 'transparent'
    const borderLeftColor = active ? colors.brand : 'transparent'
    return css`
      background: linear-gradient(${gradientTop}, ${gradientBottom});
      border-width: 2px;
      border-style: solid;
      border-left-color: ${borderLeftColor};
      border-right-color: ${borderRightColor};
      border-top-color: ${borderTopColor};
      border-bottom-color: ${borderBottomColor};
      color: 'black';
    `
  }
}

export const StyledTaskLabel = styled(Text)`
  align-items: baseline;
  ${props => props.theme.dark ?
    css`background: transparent;` :
    css`background: ${props.theme.global.colors['light-1']};`
  }
  ${props => props.theme.dark ? css`border: 2px solid ${props.theme.global.colors['light-1']};` : css`border: 2px solid transparent;`}
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  cursor: pointer;
  display: flex;
  margin-top: .5em;
  margin-bottom: .5em;
`

export const StyledTaskInput = styled.label`
  position: relative;

  input {
    opacity: 0.01;
    position: absolute;
  }

  input:enabled + ${StyledTaskLabel}:hover {
    ${props => getHoverStyles(props)}
  }

  input:focus + ${StyledTaskLabel} {
    ${props => getHoverStyles(props)}
  }

  input:enabled:active + ${StyledTaskLabel} {
    ${props => getHoverStyles(props, true)}
  }

  input:checked + ${StyledTaskLabel} {
    ${props => css`background: ${props.theme.global.colors.brand};`}
    ${props => props.theme.dark ?
      css`border: 2px solid ${props.theme.global.colors['light-1']};` :
      css`border: 2px solid transparent;`
    }
    ${props => props.theme.dark ? css`color: ${props.theme.global.colors.text.dark};` : css`color: white;`}
  }

  input:focus:checked + ${StyledTaskLabel},
  input:checked + ${StyledTaskLabel}:hover {
    ${props => props.theme.dark ?
      css`border: 2px solid ${props.theme.global.colors['light-1']};` :
      css`border: 2px solid ${props.theme.global.colors['neutral-1']};`
    }
  
    > img:only-child, svg:only-child {
      background-color: inherit !important;
    }
  }

  input:checked + ${StyledTaskLabel}:hover {
    > div > span > p {
      ${props => props.theme.dark ?
        css`color: ${props.theme.global.colors.text.dark};` :
        css`color: black;`
      }
    }
  }
`

export function TaskInput (props) {
  const {
    autoFocus,
    checked,
    className,
    disabled,
    index,
    label,
    labelIcon,
    labelStatus,
    name,
    onChange,
    theme,
    type
  } = props

  return (
    <StyledTaskInput
      className={className}
      theme={theme}
    >
      <input
        autoFocus={autoFocus}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        type={type}
        value={index}
      />
      <StyledTaskLabel margin={{ vertical: 'small', horizontal: 'none' }} theme={theme}>
        <TaskInputLabel label={label} labelIcon={labelIcon} labelStatus={labelStatus} />
      </StyledTaskLabel>
    </StyledTaskInput>
  )
}

TaskInput.defaultProps = {
  autoFocus: false,
  checked: false,
  disabled: false,
  className: '',
  label: '',
  labelIcon: null,
  labelStatus: null,
  name: '',
  onChange: () => {},
  theme: {
    dark: false
  }
}

TaskInput.propTypes = {
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  labelStatus: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  }),
  type: PropTypes.string.isRequired
}

export default memo(withTheme(TaskInput))
