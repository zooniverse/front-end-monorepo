import counterpart from 'counterpart'
import { arrayOf, bool, number, object, shape } from 'prop-types'
import React, { useState } from 'react'
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

    this.ref = React.createRef()
    this.state = {
      bounds: {},
      line: {
        consensusText: '',
        textOptions: []
      },
      show: false
    }

    this.close = this.close.bind(this)
    this.showConsensus = this.showConsensus.bind(this)
  }

  createMark (line) {
    const { activeTool, activeToolIndex, setActiveMark } = task
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
    const markSnapshot = { x1, y1, x2, y2, toolIndex: activeToolIndex }

    if (activeTool) {
      const mark = activeTool.createMark(markSnapshot)
      mark.finish()
      setActiveMark(mark)
    }
    /*
    TODO: pass the textOptions array to the new mark's subtask
    so that it can be shown as a list of choices for the text annotation
    value
    */
    const text = line.textOptions.join('\n')
    alert(text)
  }

  showConsensus (line) {
    const bounds = this.ref?.current?.getBoundingClientRect() || {}
    this.setState({
      bounds,
      line,
      show: true
    })
  }

  onClick (callback, line) {
    callback(line)
  }

  onKeyDown (event, callback, line) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      callback(line)
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
    const completedLines = lines.filter(line => line.consensusReached)
    const transcribedLines = lines.filter(line => !line.consensusReached)

    const fills = {
      transcribed: 'drawing-purple',
      complete: 'light-5'
    }

    const focusColor = theme.global.colors[theme.global.colors.focus]
    return (
      <g ref={this.ref}>
        {completedLines
          .map((line, index) => {
            const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            const mark = { length, x1, y1, x2, y2 }
            const id = `complete-${index}`
            return (
              <Tooltip
                id={id}
                key={line.id}
                label={<TooltipLabel fill={fills.complete} label={counterpart('TranscribedLines.complete')} />}
              >
                <ConsensusLine
                  role='button'
                  aria-describedby={id}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
                  onClick={() => this.onClick(this.showConsensus, line)}
                  onKeyDown={event => this.onKeyDown(event, this.showConsensus, line)}
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
            return (
              <Tooltip
                id={id}
                key={line.id}
                label={<TooltipLabel fill={fills.transcribed} label={counterpart('TranscribedLines.transcribed')} />}
              >
                <ConsensusLine
                  role='img'
                  aria-describedby={id}
                  aria-label={line.consensusText}
                  focusColor={focusColor}
                  onClick={() => this.onClick(this.createMark, line)}
                  onKeyDown={event => this.onKeyDown(event, this.createMark, line)}
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
