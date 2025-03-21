import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { Brush } from '@visx/brush'

import { useKeyZoom, useStores } from '@hooks'
import { useTranslation } from '@translations/i18n'

import DeleteButton from './DeleteButton'
import Selection from './Selection'

const HANDLE_SIZE = 10

const TRANSFORM_MATRIX = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

function cancelEvent(event) {
  event.preventDefault()
  event.stopPropagation()
}

function useDataSelectionTool() {
  const {
    classifications: {
      active: classification
    },
    workflowSteps: {
      active: step,
      findTasksByType
    }
  } = useStores()

  const [dataSelectionTask] = findTasksByType('dataVisAnnotation')
  const annotation = dataSelectionTask ? classification.addAnnotation(dataSelectionTask) : null
  const activeTask = step.tasks.find(task => task === dataSelectionTask)

  return {
    activeTool: activeTask?.activeTool,
    activeToolIndex: activeTask?.activeToolIndex,
    annotation,
    setActiveTool: activeTask?.setActiveTool
  }
}

function convertSelection(selection) {
  const x = (selection.x0 + selection.x1) / 2
  const width = selection.x1 - selection.x0
  return { x, width }
}

const DEFAULT_HANDLER = () => true

function Selections({
  disabled = false,
  feedbackBrushes=[],
  height,
  margin,
  transformMatrix = TRANSFORM_MATRIX,
  width,
  xScale = DEFAULT_HANDLER,
  yScale = DEFAULT_HANDLER
}) {
  const {
    activeTool = null,
    activeToolIndex = 0,
    annotation = null,
    setActiveTool = DEFAULT_HANDLER
  } = useDataSelectionTool()
  const {
    global: {
      colors = {}
    }
  } = useTheme()
  const { t } = useTranslation('components')
  const { onKeyZoom } = useKeyZoom()
  const eventRoot = useRef()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [createNewBrush, setCreateNewBrush] = useState(true)

  const highlighterColours = Object.keys(colors.highlighterTool)
  const allowSelection = activeTool && !disabled
  const selections = annotation?.value
  const activeSelection = annotation?.value[activeIndex]
  const activeColour = `highlighter-${highlighterColours[activeToolIndex]}`
  const brushStyle = {
    fill: colors[activeColour],
    fillOpacity: 0.2,
    stroke: colors['dark-3'],
    strokeOpacity: 0.2
  }

  let key = 'new-brush'
  let initialBrushPosition
  if (activeSelection) {
    const { x, width } = activeSelection
    const start = xScale(x - width / 2)
    const end = xScale(x + width / 2)
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
    annotation?.update(newSelections)
    if (index === activeIndex) {
      setActiveIndex(-1)
      setCreateNewBrush(true)
    }
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
      case 'Del': {
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
    const selection = selections[index]
    setActiveTool(selection.tool)
    setActiveIndex(index)
    setCreateNewBrush(false)
  }

  function onStartSelection({ x }) {
    let index = -1
    selections.forEach((selection, i) => {
      const start = xScale(selection.x - selection.width / 2)
      const end = xScale(selection.x + selection.width / 2)
      const lower = start - HANDLE_SIZE
      const upper = end + HANDLE_SIZE
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
      const { x, width } = convertSelection(selection)
      const newSelection = {
        tool: activeToolIndex,
        toolType: activeTool.type,
        x,
        width,
        zoomLevelOnCreation: transformMatrix.scaleX
      }
      const newSelections = [...selections, newSelection]
      annotation?.update(newSelections)
      return newSelections.length - 1
    } else {
      return -1
    }
  }

  function replaceActiveSelection(selection) {
    if (selection) {
      const { x, width } = convertSelection(selection)
      const newSelection = {
        ...activeSelection,
        x,
        width
      }
      const newSelections = [...selections]
      newSelections[activeIndex] = newSelection
      annotation?.update(newSelections)
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

  function FeedbackBrush({ feedbackBrush }) {
    const width = feedbackBrush.maxX - feedbackBrush.minX
    const x = feedbackBrush.minX + width / 2
    let fill = 'transparent'
    if (feedbackBrush.success === true) {
      fill = 'green'
    }
    if (feedbackBrush.success === false) {
      fill = 'red'
    }
    return (
      <Selection
        disabled
        selection={{ x, width }}
        fill={fill}
        height={height}
        xScale={xScale}
      />
    )
  }

  return (
    <g
      ref={eventRoot}
      className='brushLayer'
      focusable='true'
      onKeyDown={onKeyDown}
      onPointerDown={e => cancelEvent(e)}
      onPointerMove={e => cancelEvent(e)}
      onPointerUp={e => cancelEvent(e)}
      tabIndex='-1'
    >
      {selections?.map((selection, index) => (
        <Selection
          key={`selection-${index}`}
          active={!createNewBrush && selection === activeSelection}
          disabled={!allowSelection || selection.toolType !== activeTool.type}
          fill={colors[`highlighter-${highlighterColours[selection.tool]}`]}
          height={height}
          onSelect={() => onSelectBrush(index)}
          selection={selection}
          xScale={xScale}
        />
      ))}
      {allowSelection && (
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
      {allowSelection && selections?.map((selection, index) => (
        <DeleteButton
          key={`delete-selection-${index}`}
          colors={colors}
          cx={xScale(selection.x)}
          cy={10}
          fill={colors['accent-1']}
          label={t('SubjectViewer.ScatterPlotViewer.Selection.delete', { index: index + 1 })}
          onDelete={() => deleteSelection(index)}
          opacity={0.8}
          stroke={colors['dark-3']}
        />
      ))}
      {feedbackBrushes?.map(feedbackBrush => (
        <FeedbackBrush
          key={feedbackBrush.minX}
          feedbackBrush={feedbackBrush}
        />
      ))}
    </g>
  )
}

export default observer(Selections)
