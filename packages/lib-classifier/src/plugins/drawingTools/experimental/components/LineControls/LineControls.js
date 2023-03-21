import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'

const LineControls = forwardRef(function LineControls({
  mark,
  scale = 1,
  dragMove,
  onDelete,
  onUnselect,
  viewBox,
},
  ref
) {
  let [activePosition, setActivePosition] = useState('tr')
  const ARIA_LABEL = 'Line Controls'
  const STROKE_COLOR = 'black'
  const ARROW_STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const HOVER_COLOR = 'grey'
  const STROKE_WIDTH = 1.5 / scale
  const ARROW_STROKE_WIDTH = 0.5 / scale
  const outerRadius = 40 / scale;
  const innerRadius = 20 / scale;

  const [x, y, w, h] = viewBox.split(' ').map(n => parseInt(n, 10))
  const point = (activePosition == 'tr')
    ? { x: x + (50 / scale), y: y + (50 / scale) }
    : { x: x + w - (50 / scale), y: y + (50 / scale) }

  const StyledPath = styled('path')`
    fill: ${FILL_COLOR};
    &:hover {
      cursor: pointer;
      fill: ${HOVER_COLOR};
    }
  `

  const TL = `M ${point.x - outerRadius} ${point.y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${point.x} ${point.y - outerRadius}
    L ${point.x} ${point.y - innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 0 ${point.x - innerRadius} ${point.y}
    Z`;

  const TR = `M ${point.x + outerRadius} ${point.y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${point.x} ${point.y - outerRadius}
    L ${point.x} ${point.y - innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 1 ${point.x + innerRadius} ${point.y}
    Z`;

  const BL = `M ${point.x - outerRadius} ${point.y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${point.x} ${point.y + outerRadius}
    L ${point.x} ${point.y + innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 1 ${point.x - innerRadius} ${point.y}
    Z`;

  const BR = `M ${point.x + outerRadius} ${point.y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${point.x} ${point.y + outerRadius}
    L ${point.x} ${point.y + innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 0 ${point.x + innerRadius} ${point.y}
    Z`;

  const C = `M ${point.x - innerRadius} ${point.y}
    A ${innerRadius} ${innerRadius} 0 0 0 ${point.x + innerRadius} ${point.y}
    A ${innerRadius} ${innerRadius} 0 0 0 ${point.x - innerRadius} ${point.y}
    Z`;

  function move(e) {
    if (activePosition == 'tl') {
      setActivePosition('tr');
    } else {
      setActivePosition('tl');
    }
  }

  function destroy() {
    onDelete();
  }

  function onEnterOrSpace(ev, func) {
    if (ev.keyCode === 13 || ev.keyCode === 32) func()
  }

  return (
    <g
      ref={ref}
      role='group'
      aria-label={'Line Controls'}
      focusable='false'
    >
      <g
        role='button'
        aria-label='Undo'
        focusable='true'
        tabIndex='0'
      >
        <Tooltip label='Undo'>
          <StyledPath
            d={TL}
            stroke={ARROW_STROKE_COLOR}
            strokeWidth={ARROW_STROKE_WIDTH}
            onPointerDown={mark.undo}
            onKeyDown={(ev) => { onEnterOrSpace(ev, mark.undo) }}
          ></StyledPath>
        </Tooltip>
      </g>
      <g
        role='button'
        aria-label='Redo'
        focusable='true'
        tabIndex='1'
      >
        <Tooltip label='Redo'>
          <StyledPath
            d={TR}
            stroke={ARROW_STROKE_COLOR}
            strokeWidth={ARROW_STROKE_WIDTH}
            onPointerDown={mark.redo}
            onKeyDown={(ev) => { onEnterOrSpace(ev, mark.redo) }}
          ></StyledPath>
        </Tooltip>
      </g>
      <g
        role='button'
        aria-label='Close'
        focusable='true'
        tabIndex='2'
      >
        <Tooltip label='Close'>
          <StyledPath
            d={BL}
            stroke={ARROW_STROKE_COLOR}
            strokeWidth={ARROW_STROKE_WIDTH}
            onPointerDown={mark.close}
            onKeyDown={(ev) => { onEnterOrSpace(ev, mark.close) }}
          ></StyledPath>
        </Tooltip>
      </g>
      <g
        role='button'
        aria-label='Delete'
        focusable='true'
        tabIndex='3'
      >
        <Tooltip label='Delete'>
          <StyledPath
            d={BR}
            stroke={ARROW_STROKE_COLOR}
            strokeWidth={ARROW_STROKE_WIDTH}
            onPointerDown={destroy}
            onKeyDown={(ev) => { onEnterOrSpace(ev, destroy) }}
          ></StyledPath>
        </Tooltip>
      </g>
      <g
        role='button'
        aria-label='Move'
        focusable='true'
        tabIndex='4'
      >
        <Tooltip label='Move'>
          <StyledPath
            d={C}
            stroke={ARROW_STROKE_COLOR}
            strokeWidth={ARROW_STROKE_WIDTH}
            onPointerDown={move}
            onKeyDown={(ev) => { onEnterOrSpace(ev, move) }}
          ></StyledPath>
        </Tooltip>
      </g>
    </g>
  )
})

LineControls.propTypes = {
  mark: PropTypes.shape({
    id: PropTypes.string,
    setSubTaskVisibility: PropTypes.func
  }),
  scale: PropTypes.number,
  onDelete: PropTypes.func,
  onUnselect: PropTypes.func,

}

export default LineControls
