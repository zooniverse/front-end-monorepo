import counterpart from 'counterpart'
import { arrayOf, bool, number, shape } from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { TranscriptionLine } from '@plugins/drawingTools/components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const ConsensusLine = styled('g')`
  .tooltip {
    visibility: hidden;
  }

  &:hover .tooltip,
  &:focus .tooltip {
    visibility: visible;
  }
`

function TranscribedLines ({ lines, scale, task }) {

  function createMark (line) {
    const { activeTool, activeToolIndex, setActiveMark } = task || {}
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
  return (
    <g>
      {completedLines
        .map((line, index) => {
          const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
          const mark = { length, x1, y1, x2, y2 }
          return (
            <ConsensusLine
              role='img'
              aria-describedby={`complete-${index}`}
              aria-label={line.consensusText}
              onClick={() => showConsensus(line)}
              onKeyDown={e => (e.key === 'Enter' && showConsensus(line))}
              tabIndex={0}
            >
              <TranscriptionLine
                state='complete'
                mark={mark}
                scale={scale}
              />
              <g
                className='tooltip'
                id={`complete-${index}`}
                transform={`translate(${x1+10}, ${y1+10})`}
              >
                <rect
                  fill='#8c8c8c'
                  x={0}
                  y={0}
                  height={45}
                  width={320}
                >
                </rect>
                <text
                  fill='#fff'
                  x={20}
                  y={20}
                >
                  {counterpart('TranscribedLines.complete')}
                </text>
              </g>
            </ConsensusLine>
          )
        })
      }
      {transcribedLines
        .map((line, index) => {
          const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line.points
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
          const mark = { length, x1, y1, x2, y2 }
          return (
            <ConsensusLine
              role='img'
              aria-describedby={`transcribed-${index}`}
              aria-label={line.consensusText}
              onClick={e => createMark(line)}
              onKeyDown={e => (e.key === 'Enter' && createMark(line))}
              tabIndex={0}
            >
              <TranscriptionLine
                state='transcribed'
                mark={mark}
                scale={scale}
              />
              <g
                className='tooltip'
                id={`transcribed-${index}`}
                transform={`translate(${x1+10}, ${y1+10})`}
              >
                <rect
                  fill='#ff3c25'
                  x={0}
                  y={0}
                  height={45}
                  width={370}
                >
                </rect>
                <text
                  fill='#fff'
                  x={20}
                  y={20}
                >
                  {counterpart('TranscribedLines.transcribed')}
                </text>
              </g>
            </ConsensusLine>
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
  scale: number
}

TranscribedLines.defaultProps = {
  lines: [],
  scale: 1
}

export default TranscribedLines
