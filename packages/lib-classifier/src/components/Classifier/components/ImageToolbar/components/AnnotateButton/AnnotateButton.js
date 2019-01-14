import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import PointerIcon from './PointerIcon'
import en from './locales/en'
import Button from '../Button'

counterpart.registerTranslations('en', en)

function AnnotateButton ({ active, onClick }) {
  return (
    <Button
      active={active}
      aria-label={counterpart('AnnotateButton.ariaLabel')}
      onClick={onClick}
      icon={<PointerIcon />}
    />
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
