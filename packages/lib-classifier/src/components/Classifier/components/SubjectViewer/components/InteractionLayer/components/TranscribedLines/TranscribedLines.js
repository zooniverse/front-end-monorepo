import { array, arrayOf, bool, number, object, shape, string } from 'prop-types'
import { useState } from 'react';
import styled, { css, withTheme } from 'styled-components'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import { Tooltip } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import TooltipIcon from './components/TooltipIcon'
import ConsensusPopup from './components/ConsensusPopup'

export const ConsensusLine = styled('g')`
  cursor: pointer;

  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`

const defaultLine = {
  consensusText: '',
  textOptions: []
}
const defaultTheme = {
  global: {
    colors: {}
  }
}

function onClick(event, callback, line) {
  const node = event.target
  callback(line, node)
}

function onKeyDown(event, callback, line) {
  if (event.key === 'Enter' || event.key === ' ') {
    const node = event.target
    event.preventDefault()
    callback(line, node)
  }
}

function TranscribedLines({
  /** the transcription task annotation */
  annotation,
  /** current frame, for multiple image subjects. */
  frame = 0,
  invalidMark = false,
  /** Aggregated transcribed lines from Caesar. */
  lines = [],
  /** Marks drawn by the current user. */
  marks = [],
  /** SVG image scale (client width / natural width.) */
  scale = 1,
  /** the active transcription task */
  task = {},
  /** Grommet theme */
  theme = defaultTheme,
  /** Show/hide previously transcribed lines. */
  visible = true
}) {
  const [ bounds, setBounds ] = useState({})
  const [ line, setLine ] = useState(defaultLine)
  const [ show, setShow ] = useState(false)

  const { t } = useTranslation('components')

  if (!visible) {
    return null
  }

  const invalidTranscriptionTask = Object.keys(task).length === 0
  const completedLines = lines.filter(line => line.consensusReached)
  const transcribedLines = lines.filter(line => !line.consensusReached)
  const fills = {
    transcribed: 'drawing-pink',
    complete: 'light-5'
  }

  const focusColor = theme.global.colors[theme.global.colors.focus]

  function createMark(line, node) {
    const { activeTool, activeToolIndex, setActiveMark } = task

    if (activeTool) {
      const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
      const { id } = line
      const toolIndex = activeToolIndex
      const markSnapshot = { frame, id, x1, y1, x2, y2, toolIndex }
      const mark = activeTool.createMark(markSnapshot)
      setActiveMark(mark)

      let previousAnnotationValuesForEachMark = []
      activeTool.tasks.forEach((task) => {
        const previousAnnotationValuesForThisMark = {
          id: mark.id,
          taskKey: task.taskKey,
          taskType: task.type,
          values: line.textOptions
        }
        previousAnnotationValuesForEachMark.push(previousAnnotationValuesForThisMark)
      })
      mark.setPreviousAnnotations(previousAnnotationValuesForEachMark)
      mark.finish()
      const value = annotation.value.slice()
      annotation.update([ ...value, mark.id ])
    }
  }

  function showConsensus(line, node) {
    const bounds = node?.getBoundingClientRect() || {}
    setBounds(bounds)
    setLine(line)
    setShow(true)
  }

  function close() {
    setBounds({})
    setLine(defaultLine)
    setShow(false)
  }

  return (
    <g>
      {completedLines
        .map((line, index) => {
          const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
          const mark = { length, x1, y1, x2, y2 }
          const id = `complete-${index}`
          const disabled = invalidMark
          let lineProps = {}
          if (!disabled) {
            lineProps.onClick = event => onClick(event, showConsensus, line)
            lineProps.onKeyDown = event => onKeyDown(event, showConsensus, line)
          }
          return (
            <Tooltip
              id={id}
              key={line.id}
              icon={<TooltipIcon fill={fills.complete} />}
              label={t('SubjectViewer.InteractionLayer.TranscribedLines.complete')}
            >
              <ConsensusLine
                role='button'
                aria-disabled={disabled.toString()}
                aria-describedby={id}
                aria-label={line.consensusText}
                focusColor={focusColor}
                pointerEvents={disabled ? 'none' : 'painted'}
                tabIndex={disabled ? -1 : 0}
                {...lineProps}
              >
                <TranscriptionLine
                  state='complete'
                  mark={mark}
                  scale={scale}
                />
              </ConsensusLine>
            </Tooltip>
          )
        })
      }
      {transcribedLines
        .map((line, index) => {
          const [ existingMark ] = marks.filter(mark => mark.id === line.id)
          const disabled = invalidTranscriptionTask || invalidMark || !!existingMark
          const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
          const mark = { length, x1, y1, x2, y2 }
          const id = `transcribed-${index}`

          const lineProps = {}
          if (!disabled) {
            lineProps.onClick = event => onClick(event, createMark, line)
            lineProps.onKeyDown = event => onKeyDown(event, createMark, line)
          }

          return (
            <Tooltip
              id={id}
              key={line.id}
              icon={<TooltipIcon fill={fills.transcribed} />}
              label={t('SubjectViewer.InteractionLayer.TranscribedLines.transcribed')}
            >
              <ConsensusLine
                role='button'
                aria-describedby={id}
                aria-disabled={disabled.toString()}
                aria-label={line.consensusText}
                focusColor={focusColor}
                pointerEvents={disabled ? 'none' : 'painted'}
                tabIndex={disabled ? -1 : 0}
                {...lineProps}
              >
                <TranscriptionLine
                  state='transcribed'
                  mark={mark}
                  scale={scale}
                />
              </ConsensusLine>
            </Tooltip>
          )
        })
      }
      <ConsensusPopup
        active={show}
        closeFn={close}
        line={line}
        bounds={bounds}
      />
    </g>
  )
}

TranscribedLines.propTypes = {
  annotation: shape({
    task: string,
    taskType: string,
    value: array
  }),
  frame: number.isRequired,
  invalidMark: bool,
  lines: arrayOf(shape({
    consensusReached: bool,
    points: arrayOf(shape({
      x: number,
      y: number
    }))
  })),
  marks: arrayOf(shape({
    id: string
  })),
  scale: number,
  task: object,
  theme: shape({
    global: shape({
      colors: object
    })
  }),
  visible: bool
}

export default withTheme(TranscribedLines)
export { TranscribedLines }
