import { render, screen } from '@testing-library/react'
import TranscriptionLineMark from './TranscriptionLineMark'

describe('Drawing tools > TranscriptionLineMark', () => {
  it('should render without crashing', function () {
    const mark = {
      finished: false,
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 400,
      length: 200 * Math.sqrt(2)
    }

    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <TranscriptionLineMark active color='red' mark={mark} />
      </svg>
    )
    
    const transcriptionLineMark = document.querySelector('g')
    expect(transcriptionLineMark).to.exist
  })
})
