import { render, screen } from '@testing-library/react'
import InputStatus from './InputStatus'

/** The translation function will simply return keys in a testing env */

describe('InputStatus', function () {
  it('should not render any requirements if props.tool.min or props.tool.max is not defined', function () {
    render(<InputStatus />)
    expect(screen.getByText('InputStatus.drawn')).toBeDefined()
  })

  it('should render minimum drawing requirements if props.tool.min is defined', function () {
    render(<InputStatus tool={{ min: 1 }} />)
    expect(screen.getByText('InputStatus.min')).toBeDefined()
  })

  it('should render maxmimum drawing requirements if props.tool.max is defined', function () {
    render(<InputStatus tool={{ max: 2 }} />)
    expect(screen.getByText('InputStatus.max')).toBeDefined()
  })

  it('should render minimum and maxmimum drawing requirements if props.tool.min and props.tool.max are defined', function () {
    render(<InputStatus tool={{ min: 1, max: 2 }} />)
    expect(screen.getByText('InputStatus.maxAndMin')).toBeDefined()
  })
})
