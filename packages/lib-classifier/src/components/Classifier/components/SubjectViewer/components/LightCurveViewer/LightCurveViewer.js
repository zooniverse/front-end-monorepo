import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

function LightCurveViewer ({ url }) {
  return (
    <SVG>
      <image xlinkHref={url} />
      <InteractionLayer />
      <circle cx="100" cy="100" r="100" fill="#c33" />
    </SVG>
  )
}

LightCurveViewer.propTypes = {
  url: PropTypes.string.isRequired
}

export default LightCurveViewer
