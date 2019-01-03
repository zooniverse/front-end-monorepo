import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'

import TaskInputLabel from './components/TaskInputLabel'
import { doesTheLabelHaveAnImage } from './helpers'
import { pxToRem } from '@zooniverse/react-components'

const DEFAULT = {
  backgroundColor: theme('mode', {
    dark: zooTheme.dark.colors.container,
    light: zooTheme.light.colors.background.default
  }),
  border: theme('mode', {
    dark: `2px solid ${zooTheme.dark.colors.font}`,
    light: '2px solid transparent'
  }),
  color: theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: zooTheme.light.colors.font
  })
};

const HOVER = {
  gradientTop: theme('mode', {
    dark: zooTheme.dark.colors.button.answer.gradient.top,
    light: zooTheme.light.colors.button.answer.gradient.top
  }),
  gradientBottom: theme('mode', {
    dark: zooTheme.dark.colors.button.answer.gradient.bottom,
    light: zooTheme.light.colors.button.answer.gradient.bottom
  }),
  color: theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'black'
  })
};

const CHECKED = {
  background: theme('mode', {
    dark: zooTheme.global.colors.teal,
    light: zooTheme.global.colors.teal
  }),
  border: theme('mode', {
    dark: `2px solid ${zooTheme.global.colors.teal}`,
    light: '2px solid transparent'
  }),
  color: theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'white'
  })
};

export const StyledTaskLabel = styled.span`
  align-items: baseline;
  background-color: ${DEFAULT.backgroundColor};
  border: ${DEFAULT.border};
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  color: ${DEFAULT.color};
  cursor: pointer;
  display: flex;
  margin: ${pxToRem(10)} 0;
  padding: ${props => (doesTheLabelHaveAnImage(props.label) ? '0' : '1ch 2ch')};
  
  &:hover {
    background: linear-gradient(${HOVER.gradientTop}, ${HOVER.gradientBottom});
    border-width: 2px;
    border-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: ${HOVER.gradientTop};
    border-bottom-color: ${HOVER.gradientBottom};
    color: ${HOVER.color};
  }
`;

export const StyledTaskInputField = styled.label`
  position: relative;

  input {
    opacity: 0.01;
    position: absolute;
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

  input:active + ${StyledTaskLabel} {
    background: linear-gradient(${HOVER.gradientTop}, ${HOVER.gradientBottom});
    border-width: 2px;
    border-style: solid;
    border-color: ${theme('mode', {
      dark: zooTheme.global.colors.darkTeal,
      light: zooTheme.global.colors.teal
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
    dark: `2px solid ${zooTheme.global.colors.darkTeal}`,
    light: `2px solid ${zooTheme.global.colors.darkTeal}`
  })};
  }
`;

export function TaskInputField (props) {
  const {
    autoFocus,
    checked,
    className,
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
          defaultChecked={checked}
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