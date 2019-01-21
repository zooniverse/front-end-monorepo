import React from 'react'
import PropTypes from 'prop-types'

export default function Audio({ alt, controls, src }) {
  return (
    <div>
      <audio aria-title={alt} controls={controls}>
        <source src={src} />
      </audio>
    </div>
  )
}

Audio.defaultProps = {
  alt: '',
  controls: true
}

Audio.propTypes = {
  alt: PropTypes.string,
  controls: PropTypes.bool,
  src: PropTypes.string.isRequired
}

