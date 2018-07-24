import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import pointerIcon from './pointerIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function AnnotateButton ({ active, onClick }) {
  return (
    <Button
      active={active}
      adjustments={{ x: '1', y: '4' }}
      aria-label={counterpart('AnnotateButton.ariaLabel')}
      onClick={onClick}
    >
      {pointerIcon}
    </Button>
  )
}

AnnotateButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

AnnotateButton.defaultProps = {
  active: false,
  onClick: () => console.log(counterpart('AnnotateButton.ariaLabel'))
}

export default AnnotateButton
