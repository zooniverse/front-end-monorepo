import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import StepNavigation from './StepNavigation'

const steps = [
  { content: '# Welcome' },
  { content: '# Thank you' },
  { content: '# Goodbye' }
]

describe('StepNavigation', function () {
  it('should render no buttons and no inputs if there are no steps', function () {
    render(<StepNavigation />)
    expect(screen.queryByRole('button', { name: 'StepNavigation.previous' })).to.be.null()
    expect(screen.queryByRole('button', { name: 'StepNavigation.next' })).to.be.null()
    expect(screen.queryByRole('radiogroup')).to.be.null()
  })

  it('should render no buttons and no inputs if there is not more than one step', function () {
    render(<StepNavigation steps={[{ content: '# Welcome' }]} />)
    expect(screen.queryByRole('button', { name: 'StepNavigation.previous' })).to.be.null()
    expect(screen.queryByRole('button', { name: 'StepNavigation.next' })).to.be.null()
    expect(screen.queryByRole('radiogroup')).to.be.null()
  })

  it('should render a previous button', function () {
    render(<StepNavigation steps={steps} />)
    expect(screen.getByRole('button', { name: 'StepNavigation.previous' })).to.exist()
  })

  it('should render a next button', function () {
    render(<StepNavigation steps={steps} />)
    expect(screen.getByRole('button', { name: 'StepNavigation.next' })).to.exist()
  })

  it('should render a radio button group', function () {
    render(<StepNavigation steps={steps} />)
    expect(screen.getByRole('radiogroup')).to.exist()
  })

  it('should use the steps to set the options on RadioButtonGroup', function () {
    render(<StepNavigation steps={steps} />)
    expect(screen.getByDisplayValue('step-0')).to.exist()
    expect(screen.getByDisplayValue('step-1')).to.exist()
    expect(screen.getByDisplayValue('step-2')).to.exist()
  })

  it('should set the active value of the RadioButtonGroup', function () {
    render(<StepNavigation stepIndex={1} steps={steps} />)
    expect(screen.getByDisplayValue('step-0').checked).to.be.false()
    expect(screen.getByDisplayValue('step-1').checked).to.be.true()
    expect(screen.getByDisplayValue('step-2').checked).to.be.false()
  })

  it('should disable the previous step button when stepIndex is 0', function () {
    render(<StepNavigation steps={steps} />)
    expect(screen.getByRole('button', { name: 'StepNavigation.previous' })).to.have.attribute('disabled')
  })

  it('should disable the next step button when stepIndex is the last step', function () {
    render(<StepNavigation stepIndex={2} steps={steps} />)
    expect(screen.getByRole('button', { name: 'StepNavigation.next' })).to.have.attribute('disabled')
  })

  describe('props.onChange', function () {
    let onChangeSpy
    const user = userEvent.setup({ delay: null })

    before(function () {
      onChangeSpy = sinon.spy()
    })

    afterEach(function () {
      onChangeSpy.resetHistory()
    })

    it('should call onChange with the next step index when the next button is clicked', async function () {
      render(<StepNavigation onChange={onChangeSpy} steps={steps} />)
      await user.click(screen.getByRole('button', { name: 'StepNavigation.next' }))
      expect(onChangeSpy).to.have.been.calledOnceWith(1)
    })

    it('should call onChange with the appropriate step index when the last radio input is clicked', async function () {
      render(<StepNavigation onChange={onChangeSpy} steps={steps} />)
      await user.click(screen.getByDisplayValue('step-2'))
      expect(onChangeSpy).to.have.been.calledOnceWith(2)
    })

    it('should call onChange with the previous step index when the previous step button is clicked', async function () {
      render(<StepNavigation onChange={onChangeSpy} stepIndex={1} steps={steps} />)
      await user.click(screen.getByRole('button', { name: 'StepNavigation.previous' }))
      expect(onChangeSpy).to.have.been.calledOnceWith(0)
    })

    it('should call onChange with the appropriate step index when the first radio button is clicked, given initial stepIndex of the last option', async function () {
      render(<StepNavigation onChange={onChangeSpy} stepIndex={2} steps={steps} />)
      await user.click(screen.getByDisplayValue('step-0'))
      expect(onChangeSpy).to.have.been.calledOnceWith(0)
    })
  })
})
