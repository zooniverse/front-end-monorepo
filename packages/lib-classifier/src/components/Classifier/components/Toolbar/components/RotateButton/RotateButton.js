import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import rotateIcon from './rotateIcon'
import Button from '../Button'

function RotateButton () {
  return (
    <Button adjustments={{ y: '2' }}>
      {rotateIcon}
    </Button>
  )
}

export default RotateButton
