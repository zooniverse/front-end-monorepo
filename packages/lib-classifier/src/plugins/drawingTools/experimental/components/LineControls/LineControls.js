import React, { forwardRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import { useTranslation } from '@translations/i18n'
import { Pan, Radial, Redo, Trash, Undo, Checkmark, Close } from 'grommet-icons'
import useScale from '@plugins/drawingTools/hooks/useScale'

const StyledPath = styled('path')`
  &:hover {
    cursor: pointer;
  }
`

const LineControls = forwardRef(function LineControls({
  mark,
  onDelete,
  theme
},
  ref
) {
  const scale = useScale()
  let [activePosition, setActivePosition] = useState('tr')
  let [showDeleteButtons, setShowDeleteButtons] = useState(false)
  const { t } = useTranslation('plugins')

  const FILL_COLOR = theme.dark ? '#333333' : '#ffffff'
  const STROKE_COLOR = theme.dark ? '#ffffff' : '#000000'
  const DELETE_CANCEL_COLOR = '#E45950'
  const DELETE_CONFIRM_COLOR = '#1ED359'
  const STROKE_WIDTH = 0.5 / scale
  const OUTER_RADIUS = 40 / scale
  const INNER_RADIUS = 20 / scale

  const { viewBox, rotate, width, height } = useContext(SVGContext)
  const [x, y, w, h] = viewBox.split(' ').map(n => parseInt(n, 10))
  const p = (activePosition == 'tr')
    ? { x: x + (50 / scale), y: y + (50 / scale) }
    : { x: x + w - (50 / scale), y: y + (50 / scale) }


  function onEnterOrSpace(ev, func) {
    if (ev.keyCode === 13 || ev.keyCode === 32) {
      ev.preventDefault()
      ev.stopPropagation()
      return func(ev)
    }
  }

  function deleteMark(event) {
    setShowDeleteButtons(true)
  }

  function deleteMarkCancel() {
    setShowDeleteButtons(false)
  }

  function deleteMarkConfirm(event) {
    event.preventDefault()
    event.stopPropagation()
    return onDelete(event)
  }

  function undo(event) {
    event.preventDefault()
    event.stopPropagation()
    return mark.undo()
  }

  const deleteButtons = [
    {
      label: t('LineControls.deleteCancel'),
      action: deleteMarkCancel,
      icon: {
        type: Close,
        size: (16 / scale),
        x: p.x - (27 / scale),
        y: p.y - (8 / scale),
        color: DELETE_CANCEL_COLOR
      },
      path: `M ${p.x} ${p.y + OUTER_RADIUS}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${p.x} ${p.y - OUTER_RADIUS}
        L ${p.x} ${p.y}
        Z`
    },
    {
      label: t('LineControls.deleteConfirm'),
      action: deleteMarkConfirm,
      icon: {
        type: Checkmark,
        size: (18 / scale),
        x: p.x + (12 / scale),
        y: p.y - (10 / scale),
        color: DELETE_CONFIRM_COLOR
      },
      path: `M ${p.x} ${p.y + OUTER_RADIUS}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${p.x} ${p.y - OUTER_RADIUS}
        Z`
    }
  ]

  const defaultButtons = [
    {
      label: t('LineControls.undo'),
      action: undo,
      icon: {
        type: Undo,
        size: (10 / scale),
        x: p.x - (27 / scale),
        y: p.y - (27 / scale),
        color: STROKE_COLOR
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
        color: STROKE_COLOR
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
        color: STROKE_COLOR
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
        color: STROKE_COLOR
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
        color: STROKE_COLOR
      },
      path: `M ${p.x - INNER_RADIUS} ${p.y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x + INNER_RADIUS} ${p.y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${p.x - INNER_RADIUS} ${p.y}
        Z`
    },
  ]

  const buttons = (showDeleteButtons) ? deleteButtons : defaultButtons

  return (
    <g
      ref={ref}
      role='group'
      aria-label={t('lineControls.lineControls')}
      focusable='false'
      transform={`rotate(${-rotate} ${width / 2} ${height / 2})`}
      fill={FILL_COLOR}
    >
      {buttons.map(({ fill, label, path, action, icon }, index) => {
        const IconComponent = icon.type
        return <g focusable='false' key={index}>
          <Tooltip label={label}>
            <StyledPath
              role='button'
              aria-label={label}
              focusable='true'
              tabIndex='0'

              d={path}
              stroke={STROKE_COLOR}
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
              color={icon.color}
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
  onDelete: PropTypes.func,
}

export default withTheme(LineControls)
