import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import React, { Component, createRef, forwardRef } from 'react'
import sinon from 'sinon'
import draggable from './draggable'

const TestComponent = forwardRef(({ x, y }, ref) => {
  return <circle ref={ref} fill='blue'r={10} cx={x} cy={y} />
})

const DraggableCircle = draggable(TestComponent)

class DraggableStory extends Component {
  constructor () {
    super()
    this.svg = React.createRef()
    this.dragMove = this.dragMove.bind(this)
    this.state={
      x: 50,
      y: 100
    }
  }

  dragMove (e, d) {
    const { x, y } = this.state
    x += d.x
    y += d.y
    this.setState({ x, y})
  }

  render () {
    const { children } = this.props
    const { x, y } = this.state
    const { dragMove, svg } = this
    return (
      <svg viewBox='0 0 300 400' height={300} width={400} ref={this.svg}>
        {React.cloneElement(children, { dragMove, svg: svg.current, x, y })}
      </svg>
    )
  }
}
storiesOf('draggable', module)
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive'
    }
  })
  .add('basic', function () {
    return (
      <DraggableStory>
        <DraggableCircle />
      </DraggableStory>
    )
  })