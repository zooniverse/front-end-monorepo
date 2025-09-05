import { forwardRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'
import SVGContext from '../../../shared/SVGContext'
import { useTranslation } from '@translations/i18n'
import { Pan, Radial, Redo, Trash, Undo, Checkmark, Close } from 'grommet-icons'

const StyledGroup = styled.g`
  cursor: pointer;
  pointer-events: all !important;
`
const DEFAULT_TRANSFORM_MATRIX = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}
const LINE_CONTROL_INSET = 70

const LineControls = forwardRef(function LineControls({
  mark,
  onDelete,
  theme
},
  ref
) {
  let [activePosition, setActivePosition] = useState('tl')
  let [showDeleteButtons, setShowDeleteButtons] = useState(false)
  const { t } = useTranslation('plugins')

  const { canvas, rotate, transformMatrix = DEFAULT_TRANSFORM_MATRIX } = useContext(SVGContext)
  const { scaleX, scaleY, translateX, translateY } = transformMatrix

  const FILL_COLOR = theme.dark ? '#333333' : '#ffffff'
  const STROKE_COLOR = theme.dark ? '#ffffff' : '#000000'
  const DELETE_CANCEL_COLOR = '#E45950'
  const DELETE_CONFIRM_COLOR = '#1ED359'
  const STROKE_WIDTH = 0.5 / scaleX
  const OUTER_RADIUS = 40 / scaleX
  const INNER_RADIUS = 20 / scaleX

  const { width, height } = canvas.getBBox()
  const xLeft = (LINE_CONTROL_INSET - translateX) / scaleX
  const xRight = (width - translateX - LINE_CONTROL_INSET) / scaleX
  const y = (LINE_CONTROL_INSET - translateY) / scaleY

  const p = (activePosition === 'tl')
    ? { x: xLeft, y }
    : { x: xRight, y }

  function onEnterOrSpace(ev, func) {
    if (ev.keyCode === 13 || ev.keyCode === 32) {
      ev.preventDefault()
      ev.stopPropagation()
      return func(ev)
    }
  }

  function deleteMark() {
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
        size: (16 / scaleX),
        x: p.x - (27 / scaleX),
        y: p.y - (8 / scaleY),
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
        size: (18 / scaleX),
        x: p.x + (12 / scaleX),
        y: p.y - (10 / scaleY),
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
        size: (10 / scaleX),
        x: p.x - (27 / scaleX),
        y: p.y - (27 / scaleY),
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
        size: (10 / scaleX),
        x: p.x + (17 / scaleX),
        y: p.y - (27 / scaleY),
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
        size: (10 / scaleX),
        x: p.x - (27 / scaleX),
        y: p.y + (17 / scaleY),
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
        size: (10 / scaleX),
        x: p.x + (17 / scaleX),
        y: p.y + (17 / scaleY),
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
        size: (20 / scaleX),
        x: p.x - (10 / scaleX),
        y: p.y - (10 / scaleY),
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
    <StyledGroup
      ref={ref}
      role='group'
      aria-label={t('lineControls.lineControls')}
      focusable='false'
      fill={FILL_COLOR}
      transform={`rotate(${-rotate} ${width / 2} ${height / 2})`}
    >
      {buttons.map(({ label, path, action, icon }, index) => {
        const IconComponent = icon.type
        return <g focusable='false' key={index}>
          <Tooltip label={label}>
            <path
              role='button'
              aria-label={label}
              focusable='true'
              tabIndex='0'

              d={path}
              stroke={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              onPointerDown={action}
              onKeyDown={(ev) => { onEnterOrSpace(ev, action) }}
            ></path>
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

    </StyledGroup>
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
