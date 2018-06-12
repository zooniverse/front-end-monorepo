import React from 'react'
import PropTypes from 'prop-types'
import locationValidator from '../../helpers/locationValidator'

function SingleImageViewer ({ subject }) {
  const url = Object.values(subject.locations[0])[0]

  return (
    <svg>
      <image xlinkHref={url} />
    </svg>
  )
}

SingleImageViewer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default SingleImageViewer
