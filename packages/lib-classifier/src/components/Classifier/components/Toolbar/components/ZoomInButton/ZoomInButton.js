import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import zoomInIcon from './zoomInIcon'
import Button from '../Button'

function ZoomInButton () {
  return (
    <Button>
      {zoomInIcon}
    </Button>
  )
}

export default ZoomInButton
