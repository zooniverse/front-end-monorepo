import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { PlainButton } from '@zooniverse/react-components'

export function TaskHelpButton (props) {
  return (
    <ThemeProvider theme={{ mode: props.theme }}>
      <PlainButton
        margin='small'
        onClick={props.onClick}
        text='need some help with this task?'
      />
    </ThemeProvider>
  )
}

TaskHelpButton.defaultProps = {
  onClick: () => { },
  theme: 'light'
}

TaskHelpButton.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string
}

export default TaskHelpButton
