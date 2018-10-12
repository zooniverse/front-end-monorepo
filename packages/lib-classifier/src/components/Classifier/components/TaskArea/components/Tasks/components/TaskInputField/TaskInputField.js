import React from 'react'
import PropTypes from 'prop-types'

import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'

import TaskInputLabel from './components/TaskInputLabel'
import { doesTheLabelHaveAnImage } from './helpers'
import { pxToRem } from '../../../../../helpers'

export const StyledTaskInputField = styled.label`
  align-items: baseline;
  background-color: ${theme('mode', {
    dark: zooTheme.dark.colors.container,
    light: zooTheme.light.colors.background.default
  })};
  border: ${theme('mode', {
    dark: `2px solid ${zooTheme.dark.colors.font}`,
    light: '2px solid transparent'
  })};
  box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.5);
  color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: zooTheme.light.colors.font
  })};
  cursor: pointer;
  display: flex;
  margin: ${pxToRem(10)} 0;
  padding: ${(props) => { return doesTheLabelHaveAnImage(props.label) ? '0' : '1ch 2ch' }};
  position: relative;

  &:hover, &:focus, &[data-focus=true] {
    background: ${theme('mode', {
    dark: `linear-gradient(
        ${zooTheme.dark.colors.button.answer.gradient.top},
        ${zooTheme.dark.colors.button.answer.gradient.bottom}
      )`,
    light: `linear-gradient(
        ${zooTheme.light.colors.button.answer.gradient.top},
        ${zooTheme.light.colors.button.answer.gradient.bottom}
      )`
  })};
    border-width: 2px;
    border-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: ${theme('mode', {
    dark: zooTheme.dark.colors.button.answer.gradient.top,
    light: zooTheme.light.colors.button.answer.gradient.top
  })};
    border-bottom-color: ${theme('mode', {
    dark: zooTheme.dark.colors.button.answer.gradient.bottom,
    light: zooTheme.light.colors.button.answer.gradient.bottom
  })};
    color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'black'
  })};
  }

  &:active {
    background: ${theme('mode', {
    dark: `linear-gradient(
        ${zooTheme.dark.colors.button.answer.gradient.top},
        ${zooTheme.dark.colors.button.answer.gradient.bottom}
      )`,
    light: `linear-gradient(
        ${zooTheme.light.colors.button.answer.gradient.top},
        ${zooTheme.light.colors.button.answer.gradient.bottom}
      )`
  })};
    border-width: 2px;
    border-style: solid;
    border-color: ${theme('mode', {
    dark: zooTheme.global.colors.darkTeal,
    light: zooTheme.global.colors.teal
  })};
    color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'black'
  })};
  }

  &.active {
    background: ${theme('mode', {
    dark: zooTheme.global.colors.teal,
    light: zooTheme.global.colors.teal
  })};
    border: ${theme('mode', {
    dark: `2px solid ${zooTheme.global.colors.teal}`,
    light: '2px solid transparent'
  })};
    color: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: 'white'
  })}
  }

  &.active:hover, &.active:focus, &.active[data-focus=true] {
    background: ${theme('mode', {
    dark: zooTheme.global.colors.teal,
    light: zooTheme.global.colors.teal
  })};
    border: ${theme('mode', {
    dark: `2px solid ${zooTheme.global.colors.darkTeal}`,
    light: `2px solid ${zooTheme.global.colors.darkTeal}`
  })};
  }

  input {
    opacity: 0.01;
    position: absolute;
  }
`

export class TaskInputField extends React.Component {
  constructor () {
    super()
    this.unFocus = this.unFocus.bind(this)
  }

  state = {
    checked: false
  }

  onChange (e) {
    this.unFocus()
    this.props.onChange(e)
  }

  onFocus () {
    if (this.field) this.field.dataset.focus = true
  }

  onBlur () {
    this.unFocus()
  }

  unFocus () {
    if (this.field) this.field.dataset.focus = false
  }

  shouldInputBeAutoFocused (annotation, index, name, type) {
    if (type === 'radio' && name === 'drawing-tool') {
      return index === 0
    }

    return index === annotation.value
  }

  shouldInputBeChecked (annotation, index, type) {
    let checked
    if (type === 'radio') {
      const toolIndex = annotation._toolIndex || 0
      if (toolIndex) {
        checked = index === toolIndex
      }
      checked = index === annotation.value
    }

    if (type === 'checkbox') {
      checked = (annotation.value && annotation.value.length > 0) ? annotation.value.includes(index) : false
    }

    if (this.field) {
      if (checked) {
        this.field.classList.add('active')
      } else {
        this.field.classList.remove('active')
      }
    }

    return checked
  }

  render () {
    const {
      annotation,
      className,
      index,
      label,
      labelIcon,
      labelStatus,
      name,
      type
    } = this.props
    return (
      <ThemeProvider theme={{ mode: this.props.theme }}>
        <StyledTaskInputField
          innerRef={(node) => { this.field = node }}
          className={className}
          label={label}
          data-focus={false}
        >
          <input
            autoFocus={this.shouldInputBeAutoFocused(annotation, index, name, type)}
            checked={this.shouldInputBeChecked(annotation, index, type)}
            name={name}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            type={type}
            value={index}
          />
          <TaskInputLabel label={label} labelIcon={labelIcon} labelStatus={labelStatus} />
        </StyledTaskInputField>
      </ThemeProvider>
    )
  }
}

TaskInputField.defaultProps = {
  annotation: { value: null },
  className: '',
  label: '',
  labelIcon: null,
  labelStatus: null,
  name: '',
  onChange: () => {},
  theme: 'light'
}

TaskInputField.propTypes = {
  annotation: PropTypes.shape({
    _key: PropTypes.number,
    task: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number), // mulitple choice
      PropTypes.number, // single choice
      PropTypes.arrayOf(PropTypes.object), // drawing task
      PropTypes.object // null
    ])
  }),
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

export default TaskInputField
