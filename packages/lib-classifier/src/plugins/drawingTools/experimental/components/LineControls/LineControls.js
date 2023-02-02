import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'

let position = {
  tl: {
    x: 30,
    y: 50
  },
  tr: {
    x: 180,
    y: 50
  },
  get: (active) => {
    return position[active];
  }
}

const LineControls = forwardRef(function LineControls(
  { mark, scale = 1, dragMove, onDelete, onUnselect },
  ref
) {
  let [activePosition, setActivePosition] = useState('tr')
  const ARIA_LABEL = 'Line Controls'
  const STROKE_COLOR = 'black'
  const ARROW_STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const HOVER_COLOR = 'grey'
  const STROKE_WIDTH = 1.5
  const ARROW_STROKE_WIDTH = 0.5
  const undoTransform = `translate(${position.get(activePosition).x + 15}, ${position.get(activePosition).y - 35}) scale(${1 / scale})`
  const outerRadius = 40;
  const innerRadius = 20;
  
  const StyledPath = styled('path')`
    fill: ${FILL_COLOR};
    &:hover {
      cursor: pointer;
      fill: ${HOVER_COLOR};
    }
  `

  const TL = `M ${position.get(activePosition).x-outerRadius} ${position.get(activePosition).y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${position.get(activePosition).x} ${position.get(activePosition).y-outerRadius}
    L ${position.get(activePosition).x} ${position.get(activePosition).y - innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 0 ${position.get(activePosition).x-innerRadius} ${position.get(activePosition).y}
    Z`;

  const TR = `M ${position.get(activePosition).x+outerRadius} ${position.get(activePosition).y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${position.get(activePosition).x} ${position.get(activePosition).y-outerRadius}
    L ${position.get(activePosition).x} ${position.get(activePosition).y - innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 1 ${position.get(activePosition).x+innerRadius} ${position.get(activePosition).y}
    Z`;

  const BL = `M ${position.get(activePosition).x-outerRadius} ${position.get(activePosition).y}
    A ${outerRadius} ${outerRadius} 0 0 0 ${position.get(activePosition).x} ${position.get(activePosition).y+outerRadius}
    L ${position.get(activePosition).x} ${position.get(activePosition).y + innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 1 ${position.get(activePosition).x-innerRadius} ${position.get(activePosition).y}
    Z`;

  const BR = `M ${position.get(activePosition).x+outerRadius} ${position.get(activePosition).y}
    A ${outerRadius} ${outerRadius} 0 0 1 ${position.get(activePosition).x} ${position.get(activePosition).y+outerRadius}
    L ${position.get(activePosition).x} ${position.get(activePosition).y + innerRadius}
    A ${innerRadius} ${innerRadius} 0 0 0 ${position.get(activePosition).x+innerRadius} ${position.get(activePosition).y}
    Z`;

  const C = `M ${position.get(activePosition).x-innerRadius} ${position.get(activePosition).y}
  A ${innerRadius} ${innerRadius} 0 0 0 ${position.get(activePosition).x+innerRadius} ${position.get(activePosition).y}
  A ${innerRadius} ${innerRadius} 0 0 0 ${position.get(activePosition).x-innerRadius} ${position.get(activePosition).y}
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

  return (
    <g
      ref={ref}
      x={position.get(activePosition).x}
      y={position.get(activePosition).y}
      role='button'
      aria-label={ARIA_LABEL}
      focusable='true'
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
    >
      {/* <Tooltip label='Undo'>
        <path
          d='M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.628 5.372 12 12 12s12-5.372 12-12zM6 12l6-6v4.5h6v3h-6v4.5l-6-6z'
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
        ></path>
      </Tooltip>
	   */}
      <Tooltip label='Undo'>
        <StyledPath
          d={TL}
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
          onPointerDown={mark.undo}
        ></StyledPath>
      </Tooltip>
      <Tooltip label='Redo'>
        <StyledPath
          d={TR}
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
          onPointerDown={mark.redo}
        ></StyledPath>
      </Tooltip>
	  <Tooltip label='Close'>
        <StyledPath
          d={BL}
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
          onPointerDown={mark.close}
        ></StyledPath>
      </Tooltip>
	  <Tooltip label='Delete'>
        <StyledPath
          d={BR}
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
          onPointerDown={destroy}
        ></StyledPath>
      </Tooltip>
	  <Tooltip label='Move'>
        <StyledPath
          d={C}
          transform={undoTransform}
          stroke={ARROW_STROKE_COLOR}
          strokeWidth={ARROW_STROKE_WIDTH}
          onPointerDown={move}
        ></StyledPath>
      </Tooltip>
    </g>
  )
})

// M31.762 15.52l-0.265-0.252c-0.005-0.005-0.011-0.007-0.017-0.011l-4.055-3.701c-0.292-0.28-0.764-0.28-1.057 0l-0.172 0.252c-0.292 0.28-0.197 0.732 0.095 1.011l2.39 2.167h-11.605v-11.667l2.167 2.389c0.279 0.292 0.732 0.387 1.011 0.094l0.252-0.171c0.279-0.293 0.279-0.765 0-1.058l-3.537-3.874c-0.086-0.173-0.219-0.317-0.385-0.415l-0.044-0.046c-0.139-0.146-0.323-0.219-0.507-0.218-0.184-0.001-0.368 0.072-0.509 0.218l-0.253 0.264c-0.005 0.005-0.005 0.011-0.011 0.017l-3.61 3.992c-0.279 0.292-0.279 0.764 0 1.057l0.252 0.171c0.279 0.292 0.732 0.197 1.011-0.095l2.161-2.41v11.749h-11.759l2.389-2.167c0.292-0.28 0.387-0.732 0.095-1.011l-0.171-0.252c-0.293-0.28-0.766-0.28-1.058 0l-3.874 3.537c-0.173 0.085-0.317 0.219-0.415 0.384l-0.046 0.044c-0.146 0.139-0.219 0.324-0.218 0.508-0.001 0.184 0.071 0.368 0.218 0.509l0.265 0.253c0.005 0.005 0.011 0.006 0.016 0.011l3.992 3.61c0.292 0.279 0.764 0.279 1.058 0l0.171-0.252c0.292-0.279 0.197-0.733-0.095-1.012l-2.41-2.161h11.844v11.78l-2.161-2.41c-0.28-0.292-0.732-0.387-1.011-0.095l-0.252 0.171c-0.279 0.293-0.279 0.765 0 1.057l3.61 3.992c0.005 0.006 0.006 0.012 0.011 0.017l0.253 0.265c0.141 0.146 0.325 0.219 0.509 0.218 0.183 0.001 0.368-0.072 0.507-0.218l0.253-0.265c0.005-0.005 0.007-0.011 0.012-0.017l3.701-4.055c0.279-0.292 0.279-0.764 0-1.057l-0.252-0.172c-0.279-0.292-0.732-0.197-1.011 0.095l-2.167 2.39v-11.698h11.687l-2.41 2.161c-0.292 0.279-0.387 0.733-0.095 1.012l0.171 0.252c0.293 0.279 0.765 0.279 1.057 0l3.992-3.61c0.006-0.006 0.012-0.006 0.017-0.010l0.265-0.253c0.146-0.14 0.219-0.324 0.218-0.509 0.001-0.183-0.072-0.368-0.218-0.507z'


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
