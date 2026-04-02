import { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Tooltip } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'
import { Pan, Radial, Redo, Trash, Undo, Checkmark, Close } from 'grommet-icons'

const DELETE_CANCEL_COLOR = '#E45950'
const DELETE_CONFIRM_COLOR = '#1ED359'
const STROKE_WIDTH = 0.5
const OUTER_RADIUS = 40
const INNER_RADIUS = 20
const CENTER_X = OUTER_RADIUS + 1
const CENTER_Y = OUTER_RADIUS + 1
const WIDTH = 2 * CENTER_X
const HEIGHT = 2 * CENTER_Y
const INSET = '30px'

const StyledGroup = styled.g`
  cursor: pointer;
  pointer-events: all !important;
`

/* z-index = 1 required to ensure LineControls are above DrawingLayer in VideoWithDrawing */

const StyledSVG = styled.svg`
  position: absolute;
  top: ${INSET};
  left: ${props => props.$position === 'l' ? INSET : 'auto' };
  right: ${props => props.$position === 'r' ? INSET : 'auto' };
  z-index: 1;
`

const LineControls = forwardRef(function LineControls({
  mark,
  onDelete,
  theme
},
  ref
) {
  const [position, setPosition] = useState('l')
  const [showDeleteButtons, setShowDeleteButtons] = useState(false)
  const { t } = useTranslation('plugins')

  const FILL_COLOR = theme.dark ? '#333333' : '#ffffff'
  const STROKE_COLOR = theme.dark ? '#ffffff' : '#000000'
  
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
    return onDelete(mark)
  }

  function undo(event) {
    event.preventDefault()
    event.stopPropagation()
    return mark.undo()
  }

  function togglePosition() {
    setPosition(position === 'l' ? 'r' : 'l')
  }

  const deleteButtons = [
    {
      label: t('LineControls.deleteCancel'),
      action: deleteMarkCancel,
      icon: {
        type: Close,
        size: 16,
        x: CENTER_X - 27,
        y: CENTER_Y - 8,
        color: DELETE_CANCEL_COLOR
      },
      path: `M ${CENTER_X} ${CENTER_Y + OUTER_RADIUS}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${CENTER_X} ${CENTER_Y - OUTER_RADIUS}
        L ${CENTER_X} ${CENTER_Y}
        Z`
    },
    {
      label: t('LineControls.deleteConfirm'),
      action: deleteMarkConfirm,
      icon: {
        type: Checkmark,
        size: 18,
        x: CENTER_X + 12,
        y: CENTER_Y - 10,
        color: DELETE_CONFIRM_COLOR
      },
      path: `M ${CENTER_X} ${CENTER_Y + OUTER_RADIUS}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${CENTER_X} ${CENTER_Y - OUTER_RADIUS}
        Z`
    }
  ]

  const defaultButtons = [
    {
      label: t('LineControls.undo'),
      action: undo,
      icon: {
        type: Undo,
        size: 10,
        x: CENTER_X - 27,
        y: CENTER_Y - 27,
        color: STROKE_COLOR
      },
      path: `M ${CENTER_X - OUTER_RADIUS} ${CENTER_Y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${CENTER_X} ${CENTER_Y - OUTER_RADIUS}
        L ${CENTER_X} ${CENTER_Y - INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${CENTER_X - INNER_RADIUS} ${CENTER_Y}
        Z`
    },
    {
      label: t('LineControls.redo'),
      action: mark.redo,
      icon: {
        type: Redo,
        size: 10,
        x: CENTER_X + 17,
        y: CENTER_Y - 27,
        color: STROKE_COLOR
      },
      path: `M ${CENTER_X + OUTER_RADIUS} ${CENTER_Y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${CENTER_X} ${CENTER_Y - OUTER_RADIUS}
        L ${CENTER_X} ${CENTER_Y - INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 1 ${CENTER_X + INNER_RADIUS} ${CENTER_Y}
        Z`
    },
    {
      label: t('LineControls.close'),
      action: mark.close,
      icon: {
        type: Radial,
        size: 10,
        x: CENTER_X - 27,
        y: CENTER_Y + 17,
        color: STROKE_COLOR
      },
      path: `M ${CENTER_X - OUTER_RADIUS} ${CENTER_Y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 0 ${CENTER_X} ${CENTER_Y + OUTER_RADIUS}
        L ${CENTER_X} ${CENTER_Y + INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 1 ${CENTER_X - INNER_RADIUS} ${CENTER_Y}
        Z`
    },
    {
      label: t('LineControls.delete'),
      action: deleteMark,
      icon: {
        type: Trash,
        size: 10,
        x: CENTER_X + 17,
        y: CENTER_Y + 17,
        color: STROKE_COLOR
      },
      path: `M ${CENTER_X + OUTER_RADIUS} ${CENTER_Y}
        A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${CENTER_X} ${CENTER_Y + OUTER_RADIUS}
        L ${CENTER_X} ${CENTER_Y + INNER_RADIUS}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${CENTER_X + INNER_RADIUS} ${CENTER_Y}
        Z`
    },
    {
      label: t('LineControls.move'),
      action: togglePosition,
      icon: {
        type: Pan,
        size: 20,
        x: CENTER_X - 10,
        y: CENTER_Y - 10,
        color: STROKE_COLOR
      },
      path: `M ${CENTER_X - INNER_RADIUS} ${CENTER_Y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${CENTER_X + INNER_RADIUS} ${CENTER_Y}
        A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${CENTER_X - INNER_RADIUS} ${CENTER_Y}
        Z`
    },
  ]

  const buttons = (showDeleteButtons) ? deleteButtons : defaultButtons

  return (
    <StyledSVG 
      width={`${WIDTH}`} 
      height={`${HEIGHT}`} 
      $position={position}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    >
      <StyledGroup
        ref={ref}
        role='group'
        aria-label={t('LineControls.lineControls')}
        focusable='false'
        fill={FILL_COLOR}
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
                pointerEvents='none'
              />
            </svg>
          </g>
        })}
      </StyledGroup>
    </StyledSVG>
  )
})

LineControls.propTypes = {
  mark: PropTypes.shape({
    close: PropTypes.func,
    redo: PropTypes.func,
    undo: PropTypes.func
  }),
  onDelete: PropTypes.func
}

export default withTheme(LineControls)
