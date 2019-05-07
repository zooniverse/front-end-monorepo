import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import { darken, lighten } from 'polished'
import zooTheme from '@zooniverse/grommet-theme'

import TaskInputLabel from './components/TaskInputLabel'
import { pxToRem } from '@zooniverse/react-components'

const DEFAULT = {
  backgroundColor: theme('mode', {
    dark: zooTheme.global.colors['dark-3'],
    light: zooTheme.global.colors['light-1']
  }),
  border: theme('mode', {
    dark: `2px solid ${zooTheme.global.colors.text.dark}`,
    light: '2px solid transparent'
  }),
  color: theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: zooTheme.global.colors.text.light
  })
}

const HOVER = {
  gradientTop: theme('mode', {
    dark: darken(0.04, zooTheme.global.colors['neutral-2']),
    light: lighten(0.05, zooTheme.global.colors['accent-2'])
  }),
  gradientBottom: theme('mode', {
    dark: darken(0.11, zooTheme.global.colors['neutral-2']),
    light: darken(0.11, zooTheme.global.colors['accent-2'])
  }),
  color: theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: 'black'
  })
}

const CHECKED = {
  background: theme('mode', {
    dark: zooTheme.global.colors.brand,
    light: zooTheme.global.colors.brand
  }),
  border: theme('mode', {
    dark: `2px solid ${zooTheme.global.colors.brand}`,
    light: '2px solid transparent'
  }),
  color: theme('mode', {
    dark: zooTheme.global.colors.text.dark,
    light: 'white'
  })
}

export const StyledTaskLabel = styled.span`
  align-items: baseline;
  background-color: ${DEFAULT.backgroundColor};
  border: ${DEFAULT.border};
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  color: ${DEFAULT.color};
  cursor: pointer;
  display: flex;
  margin: ${pxToRem(10)} 0;
  padding: 5px 2ch;
`

export const StyledTaskInputField = styled.label`
  position: relative;

  input {
    opacity: 0.01;
    position: absolute;
  }

  input:enabled + ${StyledTaskLabel}:hover {
    background: linear-gradient(${HOVER.gradientTop}, ${HOVER.gradientBottom});
    border-width: 2px;
    border-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: ${HOVER.gradientTop};
    border-bottom-color: ${HOVER.gradientBottom};
    color: ${HOVER.color};
  }

  input:focus + ${StyledTaskLabel} {
    background: linear-gradient(${HOVER.gradientTop}, ${HOVER.gradientBottom});
    border-width: 2px;
    border-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: ${HOVER.gradientTop};
    border-bottom-color: ${HOVER.gradientBottom};
    color: ${HOVER.color};
  }

  input:enabled:active + ${StyledTaskLabel} {
    background: linear-gradient(${HOVER.gradientTop}, ${HOVER.gradientBottom});
    border-width: 2px;
    border-style: solid;
    border-color: ${theme('mode', {
    dark: zooTheme.global.colors['neutral-2'],
    light: zooTheme.global.colors.brand
  })};
    color: ${HOVER.color};
  }

  input:checked + ${StyledTaskLabel} {
    background: ${CHECKED.background};
    border: ${CHECKED.border};
    color: ${CHECKED.color}
  }

  input:focus:checked + ${StyledTaskLabel},
  input:checked + ${StyledTaskLabel}:hover {
    border: ${theme('mode', {
    dark: `2px solid ${zooTheme.global.colors['neutral-2']}`,
    light: `2px solid ${zooTheme.global.colors['neutral-2']}`
  })};
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
    <ThemeProvider theme={{ mode: theme }}>
      <StyledTaskInputField
        className={className}
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
        <StyledTaskLabel>
          <TaskInputLabel label={label} labelIcon={labelIcon} labelStatus={labelStatus} />
        </StyledTaskLabel>
      </StyledTaskInputField>
    </ThemeProvider>
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
  theme: 'light'
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
  theme: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default React.memo(TaskInputField)
