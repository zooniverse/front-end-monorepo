import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import moveIcon from './moveIcon'
import Button from '../Button'

function MoveButton () {
  return (
    <Button size="46">
      {moveIcon}
    </Button>
  )
}

export default MoveButton
