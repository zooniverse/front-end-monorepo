import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon'

import { FeedbackModal } from './FeedbackModal'

function renderModal (props) {
  return render(
    <FeedbackModal
      applicableRules={[]}
      hideFeedback={() => {}}
      hideSubjectViewer
      showModal
      {...props}
    />,
    { wrapper: ({ children }) => <Grommet theme={zooTheme}>{children}</Grommet> }
  )
}

describe('Component > FeedbackModal', function () {
  it('renders nothing when the modal is hidden', function () {
    renderModal({ messages: ['Yay!'], showModal: false })
    expect(screen.queryByText('Yay!')).to.not.exist
  })

  it('shows each message once', async function () {
    renderModal({ messages: ['Yay!', 'Try again', 'Yay!'] })
    expect(await screen.findAllByRole('listitem')).to.have.lengthOf(2)
  })

  it('does not count a message that appears once', async function () {
    renderModal({ messages: ['Oops. Not quite. Try again.'] })
    const item = await screen.findByRole('listitem')
    expect(item.textContent).to.equal('Oops. Not quite. Try again.')
  })

  it('counts a message that several rules share', async function () {
    renderModal({ messages: ['Well done!', 'Well done!', 'Well done!'] })
    expect((await screen.findByRole('listitem')).textContent).to.equal('Well done! (3 matches)')
  })

  it('closes when Keep Classifying is pressed', async function () {
    const user = userEvent.setup()
    const hideFeedback = sinon.spy()
    renderModal({ messages: ['Yay!'], hideFeedback })
    await user.click(await screen.findByRole('button', { name: 'Keep Classifying' }))
    expect(hideFeedback).to.have.been.called
  })
})
