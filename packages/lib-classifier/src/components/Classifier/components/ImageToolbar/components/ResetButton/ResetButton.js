import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import resetIcon from './resetIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ResetButton ({ disabled, onClick }) {
  return (
    <Button
      a11yTitle={counterpart('ResetButton.ariaLabel')}
      disabled={disabled}
      onClick={onClick}
    >
      {resetIcon}
    </Button>
  )
}

ResetButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

ResetButton.defaultProps = {
  disabled: false,
  onClick: () => console.log(counterpart('ResetButton.ariaLabel'))
}

export default ResetButton
