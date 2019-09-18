import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview () {
  return (
    <div>
      subject
    </div>
  )
}

SubjectPreview.propTypes = {
}

SubjectPreview.defaultProps = {
}

export default SubjectPreview
