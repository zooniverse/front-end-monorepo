import { composeStory } from '@storybook/react'
import { fireEvent, render, screen } from '@testing-library/react'

import Meta, { Default } from './CoordinateInput.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > CoordinateInput', function () {
  it('should render a coordinates label', function () {
    render(<DefaultStory />)
    expect(screen.getByText('Coordinates')).to.exist
  })

  it('should render a coordinates text input', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('textbox', { name: 'Coordinates' })).to.exist
  })

  it('should render a go button', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Go' })).to.exist
  })

  it('should show an error when coordinates are not in latitude, longitude format', function () {
    render(<DefaultStory />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Coordinates' }), {
      target: { value: 'invalid-value' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Go' }))

    expect(screen.getByText('Coordinates must be in "latitude, longitude" format.')).to.exist
  })

  it('should submit valid coordinates and not show an error', function () {
    const onGoSubmit = vi.fn()
    render(<DefaultStory onGoSubmit={onGoSubmit} />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Coordinates' }), {
      target: { value: '44.97652856591023, -93.22485302862626' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Go' }))

    expect(onGoSubmit).toHaveBeenCalledWith('44.97652856591023, -93.22485302862626')
    expect(screen.queryByText('Coordinates must be in "latitude, longitude" format.')).to.equal(null)
  })

  it('should submit valid coordinates on Enter key', function () {
    const onGoSubmit = vi.fn()
    render(<DefaultStory onGoSubmit={onGoSubmit} />)

    const coordinateInput = screen.getByRole('textbox', { name: 'Coordinates' })
    fireEvent.change(coordinateInput, {
      target: { value: '44.97652856591023, -93.22485302862626' }
    })
    fireEvent.keyDown(coordinateInput, { key: 'Enter', code: 'Enter' })

    expect(onGoSubmit).toHaveBeenCalledWith('44.97652856591023, -93.22485302862626')
  })
})
