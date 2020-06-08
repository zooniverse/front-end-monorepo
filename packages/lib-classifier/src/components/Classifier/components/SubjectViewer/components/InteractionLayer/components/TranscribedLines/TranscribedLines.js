import counterpart from 'counterpart'
import { arrayOf, bool, number, object, shape } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { TranscriptionLine } from '@plugins/drawingTools/components'
import { Tooltip } from '@zooniverse/react-components'
import TooltipLabel from './components/TooltipLabel'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const ConsensusLine = styled('g')`
  cursor: pointer;

  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }
`

function TranscribedLines ({ lines, scale, task, theme }) {
  function createMark (line) {
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

  function showConsensus (line) {
    alert(line.consensusText)
  }

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
          return (
            <Tooltip id={id} label={<TooltipLabel fill={fills.complete} label={counterpart('TranscribedLines.complete')} />}>
              <ConsensusLine
                role='img'
                aria-describedby={id}
                aria-label={line.consensusText}
                focusColor={focusColor}
                key={line.id}
                onClick={() => showConsensus(line)}
                onKeyDown={e => (e.key === 'Enter' && showConsensus(line))}
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
            <Tooltip id={id} label={<TooltipLabel fill={fills.transcribed} label={counterpart('TranscribedLines.transcribed')} />}>
              <ConsensusLine
                role='img'
                aria-describedby={id}
                aria-label={line.consensusText}
                focusColor={focusColor}
                key={line.id}
                onClick={e => createMark(line)}
                onKeyDown={e => (e.key === 'Enter' && createMark(line))}
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
    </g>
  )
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
