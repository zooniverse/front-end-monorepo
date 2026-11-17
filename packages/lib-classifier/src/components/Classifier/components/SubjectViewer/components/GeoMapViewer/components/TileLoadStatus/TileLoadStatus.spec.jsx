import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon'

import Meta, { Failed, Loading } from './TileLoadStatus.stories'
import TileLoadStatus from './TileLoadStatus'

const LoadingStory = composeStory(Loading, Meta)
const FailedStory = composeStory(Failed, Meta)

describe('Component > TileLoadStatus', function () {
  it('renders nothing while imagery is settled', function () {
    const { container } = render(<TileLoadStatus onRetry={() => {}} />)
    expect(container.textContent).to.equal('')
  })

  it('tells the volunteer imagery is loading', function () {
    render(<LoadingStory />)
    expect(screen.getByRole('status').textContent).to.match(/loading map imagery/i)
    expect(screen.queryByRole('button', { name: 'Retry' })).to.not.exist
  })

  it('tells the volunteer imagery failed and offers a retry', function () {
    render(<FailedStory />)
    expect(screen.getByRole('status').textContent).to.match(/imagery failed to load/i)
    expect(screen.getByRole('button', { name: 'Retry' })).to.exist
  })

  it('retries when the Retry button is pressed', async function () {
    const user = userEvent.setup()
    const onRetry = sinon.spy()
    render(<FailedStory onRetry={onRetry} />)
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(onRetry).to.have.been.calledOnce
  })

  it('reports a failure over loading', function () {
    render(<TileLoadStatus failed loading onRetry={() => {}} />)
    expect(screen.getByRole('status').textContent).to.match(/imagery failed to load/i)
  })
})
