import { withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'
import theme from './theme'

counterpart.registerTranslations('en', en)

const Label = (
  <Text size='medium'>
    {counterpart('DoneAndTalkButton.doneAndTalk')}
  </Text>
)

function DoneAndTalkButton (props) {
  if (!props.completed) {
    return (
      <Button
        disabled={props.disabled}
        label={Label}
        onClick={props.onClick}
        type='submit'
      />
    )
  }

  return null
}

DoneAndTalkButton.defaultProps = {
  completed: false,
  demoMode: false, // TODO: add demo mode to classifier
  disabled: false,
  goldStandardMode: false, // TODO: add gold standard mode to classifier
  onClick: () => {}
}

DoneAndTalkButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func
}

export default withThemeContext(DoneAndTalkButton, theme)
export { DoneAndTalkButton }
