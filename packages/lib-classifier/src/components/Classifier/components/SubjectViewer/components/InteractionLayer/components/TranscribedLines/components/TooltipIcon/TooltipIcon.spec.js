import { render } from '@testing-library/react'
import { Blank } from 'grommet-icons'
import TooltipIcon from './TooltipIcon'

describe('TranscribedLines > Component > TooltipIcon', function () {
  beforeEach(function () {
    render(
      <TooltipIcon
        fill='blue'
      />
    )
  })

  it('should render without crashing', function () {
    const icon = document.querySelector('circle[cx="12"]')
    expect(icon).to.exist()
  })
})
