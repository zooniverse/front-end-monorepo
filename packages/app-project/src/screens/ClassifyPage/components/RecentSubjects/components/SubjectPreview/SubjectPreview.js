import counterpart from 'counterpart'
import { array, string } from 'prop-types'
import React from 'react'
import { Media } from '@zooniverse/react-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectPreview ({ subjectId, locations }) {
  const subjectURLs = locations.map(location => Object.values(location)[0])
  const subjectURL = subjectURLs[0]
  return (
    <Media
      alt={`subject ${subjectId}`}
      height={350}
      src={subjectURL}
      width={400}
    />
  )
}

SubjectPreview.propTypes = {
  subjectId: string,
  locations: array
}

SubjectPreview.defaultProps = {
  subjectId: '',
  locations: []
}

export default SubjectPreview
