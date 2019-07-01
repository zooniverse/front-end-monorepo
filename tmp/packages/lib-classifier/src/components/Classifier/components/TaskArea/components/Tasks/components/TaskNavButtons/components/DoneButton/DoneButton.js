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
    {counterpart('DoneButton.done')}
  </Text>
)

// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
function DoneButton (props) {
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

DoneButton.defaultProps = {
  completed: false,
  demoMode: false,
  disabled: false,
  goldStandardMode: false,
  onClick: () => {}
}

DoneButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func
}

export default withThemeContext(DoneButton, theme)
export { DoneButton }
