import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import zoomOutIcon from './zoomOutIcon'
import Button from '../Button'

function ZoomOutButton () {
  return (
    <Button aria-label="Zoom out">
      {zoomOutIcon}
    </Button>
  )
}

export default ZoomOutButton
