import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import actualSizeIcon from './actualSizeIcon'
import fullscreenIcon from './fullscreenIcon'
import Button from '../Button'

function FullscreenButton () {
  const icon = fullscreenIcon
  return (
    <Button aria-label="Fullscreen">
      {icon}
    </Button>
  )
}

export default FullscreenButton
