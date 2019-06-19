import React, { Component } from 'react'

const RADIUS = {
  large: 10,
  small: 2
}
const SELECTED_RADIUS = {
  large: 20,
  small: 10
}
const CROSSHAIR_SPACE = 0.2
const CROSSHAIR_WIDTH = 1
const DELETE_BUTTON_ANGLE = 45

class Point extends Component {
  constructor () {
    super()

    this.defaultValues = this.defaultValues.bind(this)
    this.initStart = this.initStart.bind(this)
    this.initRelease = this.initRelease.bind(this)
  }

  defaultValues ({ x, y }) {
    return { x, y }
  }

  initStart () {
    this._inProgress = true
  }

  initRelease () {
    this._inProgess = false
  }

  render () {
    const { mark, scale } = this.props
    const size = 'large'
    const averageScale = (scale.horizontal + scale.vertical) / 2

    const crosshairSpace = CROSSHAIR_SPACE / averageScale
    const crosshairWidth = CROSSHAIR_WIDTH / averageScale
    const selectedRadius = SELECTED_RADIUS[size] / averageScale

    const radius = RADIUS[size] / averageScale

    return (
      <g key={mark._key} transform={`translate(${mark.x}, ${mark.y})`} style={{ color: 'rgb(0, 255, 0)' }}>
        <g fill='transparent' stroke='currentColor' strokeWidth='2.5' tabIndex='-1'>
          <line x1='0' y1={-1 * crosshairSpace * selectedRadius} x2='0' y2={-1 * selectedRadius} strokeWidth={crosshairWidth} />
          <line x1={-1 * crosshairSpace * selectedRadius} y1='0' x2={-1 * selectedRadius} y2='0' strokeWidth={crosshairWidth} />
          <line x1='0' y1={crosshairSpace * selectedRadius} x2='0' y2={selectedRadius} strokeWidth={crosshairWidth} />
          <line x1={crosshairSpace * selectedRadius} y1='0' x2={selectedRadius} y2='0' strokeWidth={crosshairWidth} />
          <circle r={radius} />
        </g>
      </g>
    )
  }
}

export default Point
