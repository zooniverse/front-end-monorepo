import { useEffect, useRef, useState } from 'react'
import { Brush } from '@visx/brush'

import { useKeyZoom } from '@hooks'
import { useTranslation } from '@translations/i18n'

import DeleteButton from './DeleteButton'
import Selection from './Selection'

const HANDLE_SIZE = 10

export default function Selections({
  colors,
  disabled,
  height,
  initialSelections = [],
  margin,
  width,
  xScale,
  yScale
}) {
  const { t } = useTranslation('components')
  const { onKeyZoom } = useKeyZoom()
  const eventRoot = useRef()
  const [selections, setSelections] = useState(initialSelections)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [createNewBrush, setCreateNewBrush] = useState(true)
  const activeSelection = selections[activeIndex]
  const brushStyle = {
    fill: colors['highlighter-blue'],
    fillOpacity: 0.2,
    stroke: colors['dark-3'],
    strokeOpacity: 0.2
  }

  let key = 'new-brush'
  let initialBrushPosition
  if (activeSelection) {
    const start = xScale(activeSelection.x0)
    const end = xScale(activeSelection.x1)
    initialBrushPosition = {
      start: { x: start },
      end: { x: end }
    }
    key = `active-selection-${start}-${end}`
  }

  if (disabled && activeSelection) {
    setActiveIndex(-1)
    setCreateNewBrush(true)
  }

  function deleteSelection(index) {
    const newSelections = selections.filter((selection, i) => i !== index)
    setSelections(newSelections)
    if (index === activeIndex) {
      setActiveIndex(-1)
      setCreateNewBrush(true)
    }
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Backspace': {
        if (activeIndex > -1) {
          event.preventDefault()
          deleteSelection(activeIndex)
          return false
        }
      }
    }
    return onKeyZoom(event)
  }

  function onStartNewBrush() {
    setCreateNewBrush(true)
  }

  function onSelectBrush(index) {
    setActiveIndex(index)
    setCreateNewBrush(false)
  }

  function onStartSelection({ x }) {
    let index = -1
    selections.forEach((selection, i) => {
      const lower = xScale(selection.x0) - HANDLE_SIZE
      const upper = xScale(selection.x1) + HANDLE_SIZE
      const click = xScale(x)
      const isSelection = (click > lower) && (click < upper)
      if (isSelection) {
        index = i
      }
    })
    if (index > -1) {
      onSelectBrush(index)
    } else {
      onStartNewBrush()
    }
  }

  function createNewSelection(selection) {
    if (selection) {
      const newSelections = [...selections, selection]
      setSelections(newSelections)
      return newSelections.length - 1
    } else {
      return -1
    }
  }

  function replaceActiveSelection(selection) {
    if (selection) {
      const newSelections = [...selections]
      newSelections[activeIndex] = selection
      setSelections(newSelections)
      return activeIndex
    } else {
      setCreateNewBrush(true)
      return -1
    }
  }

  function onEndSelection(selection) {
    const newSelection = createNewBrush ? createNewSelection(selection) : replaceActiveSelection(selection)
    setActiveIndex(newSelection)
    eventRoot?.current.focus()
  }

  return (
    <g
      ref={eventRoot}
      className='brushLayer'
      focusable='true'
      onKeyDown={onKeyDown}
      tabIndex='-1'
    >
      {selections.map((selection, index) => (
        <Selection
          key={`selection-${index}`}
          active={!createNewBrush && selection === activeSelection}
          disabled={disabled}
          fill={colors['highlighter-blue']}
          height={height}
          onSelect={() => onSelectBrush(index)}
          selection={selection}
          xScale={xScale}
        />
      ))}
      {!disabled && (
        <Brush
          key={key}
          handleSize={HANDLE_SIZE}
          height={height}
          initialBrushPosition={initialBrushPosition}
          margin={margin}
          onBrushStart={onStartSelection}
          onBrushEnd={onEndSelection}
          selectedBoxStyle={brushStyle}
          width={width}
          xScale={xScale}
          yScale={yScale}
        />
      )}
      {!disabled && selections.map((selection, index) => (
        <DeleteButton
          key={`delete-selection-${index}`}
          colors={colors}
          cx={xScale((selection.x0 + selection.x1) / 2)}
          cy={10}
          fill={colors['accent-1']}
          label={t('SubjectViewer.ScatterPlotViewer.Selection.delete', { index: index + 1 })}
          onDelete={() => deleteSelection(index)}
          opacity={0.8}
          stroke={colors['dark-3']}
        />
      ))}
    </g>
  )
}
