import { PrimaryButton, withThemeContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'
import theme from './theme'

counterpart.registerTranslations('en', en)

// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
function DoneButton ({
  annotations = [],
  completed = false,
  disabled = false,
  hasNextStep = false,
  onClick = () => true
}) {
  if (!completed) {
    return (
<<<<<<< HEAD
      <Button
        disabled={disabled}
        label={Label}
        onClick={onClick}
        type='submit'
=======
      <PrimaryButton
        color='green'
        disabled={props.disabled}
        fill
        label={counterpart('DoneButton.done')}
        onClick={props.onClick}
        style={{ textTransform: 'capitalize' }}
>>>>>>> Fix regressions and update text color on green button for accessibility
      />
    )
  }

  return null
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
