import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { PlainButton } from '@zooniverse/react-components'

const StyledPlainButton = styled(PlainButton)`
  text-align: center;
`

// TODO: Translation support here
export function TaskHelpButton (props) {
  return (
    <ThemeProvider theme={{ mode: props.theme }}>
      <StyledPlainButton
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
