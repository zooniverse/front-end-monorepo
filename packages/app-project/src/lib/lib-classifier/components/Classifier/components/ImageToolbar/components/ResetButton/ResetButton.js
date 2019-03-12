import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import resetIcon from './resetIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ResetButton ({ onClick }) {
  return (
    <Button
      aria-label={counterpart('ResetButton.ariaLabel')}
      onClick={onClick}
    >
      {resetIcon}
    </Button>
  )
}

ResetButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

ResetButton.defaultProps = {
  active: false,
  onClick: () => console.log(counterpart('ResetButton.ariaLabel'))
}

export default ResetButton
