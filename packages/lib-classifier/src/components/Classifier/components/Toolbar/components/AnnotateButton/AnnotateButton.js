import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import pointerIcon from './pointerIcon'
import Button from '../Button'

function AnnotateButton () {
  return (
    <Button adjustments={{ x: '1', y: '4' }} aria-label="Annotate">
      {pointerIcon}
    </Button>
  )
}

export default AnnotateButton
