import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import ResetIcon from './ResetIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function ResetButton ({ onClick }) {
  return (
    <Button
      aria-label={counterpart('ResetButton.ariaLabel')}
      icon={<ResetIcon />}
      onClick={onClick}
    />
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
