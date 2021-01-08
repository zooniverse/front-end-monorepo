import { arrayOf, bool, shape, string } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'

import WideLayout from './components/WideLayout'
import NarrowLayout from './components/NarrowLayout'

function Hero (props) {
  const { isWide, workflows } = props
  return isWide
    ? <WideLayout workflows={workflows} />
    : <NarrowLayout workflows={workflows} />
}

Hero.propTypes = {
  isWide: bool,
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

Hero.defaultProps = {
  isWide: false,
  workflows: []
}
export default Hero
