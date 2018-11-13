import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function Tutorial () {
  return (
    <div>
      component
    </div>
  )
}

Tutorial.propTypes = {
}

Tutorial.defaultProps = {
}

export default Tutorial
