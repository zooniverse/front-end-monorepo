import React, { forwardRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import { useTranslation } from '@translations/i18n'
import { Pan, Radial, Redo, Trash, Undo } from 'grommet-icons'

const LineControls = forwardRef(function LineControls({
  mark,
  scale = 1,
  onDelete
},
  ref
) {
  let [activePosition, setActivePosition] = useState('tr')
  const { t } = useTranslation('plugins')

  const ARROW_STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const HOVER_COLOR = 'grey'
  const STROKE_WIDTH = 0.5 / scale
  const OUTER_RADIUS = 40 / scale
  const INNER_RADIUS = 20 / scale

  const { viewBox, rotate, width, height } = useContext(SVGContext)
  const [x, y, w, h] = viewBox.split(' ').map(n => parseInt(n, 10))
  const p = (activePosition == 'tr')
    ? { x: x + (50 / scale), y: y + (50 / scale) }
    : { x: x + w - (50 / scale), y: y + (50 / scale) }

  const StyledPath = styled('path')`
    fill: ${FILL_COLOR}
    &:hover {
      cursor: pointer;
      fill: ${HOVER_COLOR};
    }
  `

  function onEnterOrSpace(ev, func) {
    if (ev.keyCode === 13 || ev.keyCode === 32) {
      ev.preventDefault()
      ev.stopPropagation()
      return func(ev)
    }
  }

  function deleteMark(event) {
    event.preventDefault()
    event.stopPropagation()
    return onDelete(event)
  }

  const buttons = [
    {
      label: t('LineControls.undo'),
      action: mark.undo,
      icon: {
        type: Undo,
        size: (10 / scale),
        x: p.x - (27 / scale),
        y: p.y - (27 / scale),
      },
      path: `M ${p.x - OUTER_RADIUS} ${p.y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${p.x} ${p.y - OUTER_RADIUS}
        L ${p.x} ${p.y - INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x - INNER_RADIUS} ${p.y}
        Z`
    },
    {
      label: t('LineControls.redo'),
      action: mark.redo,
      icon: {
        type: Redo,
        size: (10 / scale),
        x: p.x + (17 / scale),
        y: p.y - (27 / scale),
      },
      path: `M ${p.x + OUTER_RADIUS} ${p.y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${p.x} ${p.y - OUTER_RADIUS}
        L ${p.x} ${p.y - INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 1 ${p.x + INNER_RADIUS} ${p.y}
        Z`
    },
    {
      label: t('LineControls.close'),
      action: mark.close,
      icon: {
        type: Radial,
        size: (10 / scale),
        x: p.x - (27 / scale),
        y: p.y + (17 / scale),
      },
      path: `M ${p.x - OUTER_RADIUS} ${p.y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${p.x} ${p.y + OUTER_RADIUS}
        L ${p.x} ${p.y + INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 1 ${p.x - INNER_RADIUS} ${p.y}
        Z`
    },
    {
      label: t('LineControls.delete'),
      action: deleteMark,
      icon: {
        type: Trash,
        size: (10 / scale),
        x: p.x + (17 / scale),
        y: p.y + (17 / scale),
      },
      path: `M ${p.x + OUTER_RADIUS} ${p.y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${p.x} ${p.y + OUTER_RADIUS}
        L ${p.x} ${p.y + INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x + INNER_RADIUS} ${p.y}
        Z`
    },
    {
      label: t('LineControls.move'),
      action: () => {
        setActivePosition((activePosition == 'tl') ? 'tr' : 'tl')
      },
      icon: {
        type: Pan,
        size: (20 / scale),
        x: p.x - (10 / scale),
        y: p.y - (10 / scale),
      },
      path: `M ${p.x - INNER_RADIUS} ${p.y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x + INNER_RADIUS} ${p.y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x - INNER_RADIUS} ${p.y}
        Z`
    },
  ]

  return (
    <g
      ref={ref}
      role='group'
      aria-label={t('lineControls.lineControls')}
      focusable='false'
      transform={`rotate(${-rotate} ${width / 2} ${height / 2})`}
	  fill={FILL_COLOR}
    >
      {buttons.map(({ label, path, action, icon }, index) => {
        const IconComponent = icon.type
        return <g focusable='false' key={index}>
          <Tooltip label={label}>
            <StyledPath
              role='button'
              aria-label={label}
              focusable='true'
              tabIndex='0'

              d={path}
              stroke={ARROW_STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              onPointerDown={action}
              onKeyDown={(ev) => { onEnterOrSpace(ev, action) }}
            ></StyledPath>
          </Tooltip>
          <svg
            height={icon.size}
            width={icon.size}
            x={icon.x}
            y={icon.y}
          >
            <IconComponent
              color='white'
              size={`${icon.size}px`}
              focusable='false'
            />
          </svg>
        </g>
      })}
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
}

export default LineControls
