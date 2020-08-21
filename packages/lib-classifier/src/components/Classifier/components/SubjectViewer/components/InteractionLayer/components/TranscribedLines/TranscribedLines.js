import counterpart from 'counterpart'
import { arrayOf, bool, number, object, shape } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import { Tooltip } from '@zooniverse/react-components'
import ConsensusPopup from './components/ConsensusPopup'
import TooltipLabel from './components/TooltipLabel'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const ConsensusLine = styled('g')`
  cursor: pointer;

  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
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

  createMark (line, ref) {
    const { activeTool, activeToolIndex, setActiveMark } = this.props.task
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
    const markSnapshot = { x1, y1, x2, y2, toolIndex: activeToolIndex }

    if (activeTool) {
      const mark = activeTool.createMark(markSnapshot)
      mark.finish()
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
      mark.setSubTaskVisibility(true, ref?.current, previousAnnotationValuesForEachMark)
      ref?.current?.blur()
    }
  }

  showConsensus (line, ref) {
    const bounds = ref?.current?.getBoundingClientRect() || {}
    this.setState({
      bounds,
      line,
      show: true
    })
  }

  onClick (callback, line, ref) {
    callback(line, ref)
  }

  onKeyDown (event, callback, line, ref) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      callback(line, ref)
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
    const { lines, scale, task, theme } = this.props
    const { bounds, line, show } = this.state
    const disabled = Object.keys(task).length === 0
    const completedLines = lines.filter(line => line.consensusReached)
    const transcribedLines = lines.filter(line => !line.consensusReached)

    const fills = {
      transcribed: 'drawing-purple',
      complete: 'light-5'
    }

    const focusColor = theme.global.colors[theme.global.colors.focus]
    return (
      <g>
        {completedLines
          .map((line, index) => {
            const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            const mark = { length, x1, y1, x2, y2 }
            const id = `complete-${index}`
            const ref = React.createRef()

            return (
              <Tooltip
                id={id}
                key={line.id}
                label={<TooltipLabel fill={fills.complete} label={counterpart('TranscribedLines.complete')} />}
              >
                <ConsensusLine
                  ref={ref}
                  role='button'
                  aria-describedby={id}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
                  onClick={() => this.onClick(this.showConsensus, line, ref)}
                  onKeyDown={event => this.onKeyDown(event, this.showConsensus, line, ref)}
                  tabIndex={0}
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
            const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            const mark = { length, x1, y1, x2, y2 }
            const id = `transcribed-${index}`
            const ref = React.createRef()

            return (
              <Tooltip
                id={id}
                key={line.id}
                label={<TooltipLabel fill={fills.transcribed} label={counterpart('TranscribedLines.transcribed')} />}
              >
                <ConsensusLine
                  ref={ref}
                  role='button'
                  aria-describedby={id}
                  aria-disabled={disabled.toString()}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
                  onClick={() => {
                    if (!disabled) this.onClick(this.createMark, line, ref)
                  }}
                  onKeyDown={(event) => {
                    if (!disabled) this.onKeyDown(event, this.createMark, line, ref)
                  }}
                  tabIndex={0}
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
  lines: arrayOf(shape({
    consensusReached: bool,
    points: arrayOf(shape({
      x: number,
      y: number
    }))
  })),
  scale: number,
  task: object,
  theme: shape({
    global: shape({
      colors: object
    })
  })
}

TranscribedLines.defaultProps = {
  lines: [],
  scale: 1,
  task: {},
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withTheme(TranscribedLines)
export { TranscribedLines }
