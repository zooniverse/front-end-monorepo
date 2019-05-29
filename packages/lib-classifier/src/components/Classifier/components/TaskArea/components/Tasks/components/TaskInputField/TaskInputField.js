import React from 'react'
import PropTypes from 'prop-types'

import styled, { withTheme } from 'styled-components'
import { darken, lighten } from 'polished'
import { Text } from 'grommet'

import TaskInputLabel from './components/TaskInputLabel'


function getHoverStyles (props, active = false) {
  const { theme: { dark, global: { colors } } } = props
  if (dark) {
    const borderColor = active ? colors['accent-2'] : colors['light-1']
    return `
      background: ${darken(0.04, colors['neutral-2'])};
      border: 2px solid ${borderColor};
      color: ${colors.text.dark};
    `
  } else {
    const gradientTop = lighten(0.05, colors['accent-2'])
    const gradientBottom =  darken(0.11, colors['accent-2'])
    const borderTopColor = active ? colors.brand : gradientTop
    const borderBottomColor = active ? colors.brand : gradientBottom
    const borderRightColor = active ? colors.brand : 'transparent'
    const borderLeftColor = active ? colors.brand : 'transparent'
    return `
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
  background: ${props => props.theme.dark ? props.theme.global.colors['dark-3'] : props.theme.global.colors['light-1']};
  border: ${props => props.theme.dark ? `2px solid ${props.theme.global.colors['light-1']}` : '2px solid transparent'};
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  cursor: pointer;
  display: flex;
`

export const StyledTaskInputField = styled.label`
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
    background: ${props => props.theme.global.colors.brand};
    border: ${props => props.theme.dark ? `2px solid ${props.theme.global.colors['light-1']}` : '2px solid transparent'};
    color: ${props => props.theme.dark ? props.theme.global.colors.text.dark : 'white'}
  }

  input:focus:checked + ${StyledTaskLabel},
  input:checked + ${StyledTaskLabel}:hover {
    border: ${props => props.theme.dark ? `2px solid ${props.theme.global.colors['light-1']}` : `2px solid ${props.theme.global.colors['neutral-2']}`};
  
    > img:only-child, svg:only-child {
      background-color: inherit !important;
    }
  }

  input:checked + ${StyledTaskLabel}:hover {
    color: ${props => props.theme.dark ? props.theme.global.colors.text.dark : 'black'}
  }
`

export function TaskInputField (props) {
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
    <StyledTaskInputField
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
    </StyledTaskInputField>
  )
}

TaskInputField.defaultProps = {
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

TaskInputField.propTypes = {
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

export default React.memo(withTheme(TaskInputField))
