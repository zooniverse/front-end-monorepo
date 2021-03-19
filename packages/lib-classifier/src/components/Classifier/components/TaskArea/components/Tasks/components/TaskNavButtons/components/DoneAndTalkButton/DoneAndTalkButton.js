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

function DoneAndTalkButton ({
  disabled = false,
  onClick = () => {}
}) {
  return (
    <Button
      disabled={disabled}
      label={Label}
      onClick={onClick}
      style={{ marginRight: '1ch' }}
      type='submit'
    />
  )
}

DoneAndTalkButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default withThemeContext(DoneAndTalkButton, theme)
export { DoneAndTalkButton }
