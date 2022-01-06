import counterpart from 'counterpart'
import { array, arrayOf, bool, number, object, shape, string } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import { Tooltip } from '@zooniverse/react-components'
import TooltipIcon from './components/TooltipIcon'
import ConsensusPopup from './components/ConsensusPopup'
import en from './locales/en'

counterpart.registerTranslations('en', en)

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

class TranscribedLines extends React.Component {
  constructor () {
    super()

    this.state = {
      bounds: {},
      line: {
        consensusText: '',
        textOptions: []
      },
      show: false
    }

    this.createMark = this.createMark.bind(this)
    this.close = this.close.bind(this)
    this.showConsensus = this.showConsensus.bind(this)
  }

  createMark (line, node) {
    const { annotation, frame } = this.props
    const { activeTool, activeToolIndex, setActiveMark } = this.props.task

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

  showConsensus (line, node) {
    const bounds = node?.getBoundingClientRect() || {}
    this.setState({
      bounds,
      line,
      show: true
    })
  }

  onClick (event, callback, line) {
    const node = event.target
    callback(line, node)
  }

  onKeyDown (event, callback, line) {
    if (event.key === 'Enter' || event.key === ' ') {
      const node = event.target
      event.preventDefault()
      callback(line, node)
    }
  }

  close () {
    this.setState({
      bounds: {},
      line: {
        consensusText: '',
        textOptions: []
      },
      show: false
    })
  }

  render () {
    const { invalidMark, lines, marks, scale, task, theme, visible } = this.props
    const { bounds, line, show } = this.state
    const invalidTranscriptionTask = Object.keys(task).length === 0
    const completedLines = lines.filter(line => line.consensusReached)
    const transcribedLines = lines.filter(line => !line.consensusReached)

    const fills = {
      transcribed: 'drawing-pink',
      complete: 'light-5'
    }

    const focusColor = theme.global.colors[theme.global.colors.focus]

    if (!visible) {
      return null
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
              lineProps.onClick = event => this.onClick(event, this.showConsensus, line)
              lineProps.onKeyDown = event => this.onKeyDown(event, this.showConsensus, line)
            }
            return (
              <Tooltip
                id={id}
                key={line.id}
                icon={<TooltipIcon fill={fills.complete} />}
                label={counterpart('TranscribedLines.complete')}
              >
                <ConsensusLine
                  role='button'
                  aria-disabled={disabled.toString()}
                  aria-describedby={id}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
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
              lineProps.onClick = event => this.onClick(event, this.createMark, line)
              lineProps.onKeyDown = event => this.onKeyDown(event, this.createMark, line)
            }

            return (
              <Tooltip
                id={id}
                key={line.id}
                icon={<TooltipIcon fill={fills.transcribed} />}
                label={counterpart('TranscribedLines.transcribed')}
              >
                <ConsensusLine
                  role='button'
                  aria-describedby={id}
                  aria-disabled={disabled.toString()}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
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
          closeFn={this.close}
          line={line}
          bounds={bounds}
        />
      </g>
    )
  }
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

TranscribedLines.defaultProps = {
  invalidMark: false,
  lines: [],
  marks: [],
  scale: 1,
  task: {},
  theme: {
    global: {
      colors: {}
    }
  },
  visible: true
}

export default withTheme(TranscribedLines)
export { TranscribedLines }
