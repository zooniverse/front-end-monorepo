import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { panoptes } from '@zooniverse/panoptes-js'
import { applyRequestHandlers } from 'msw-storybook-addon'
import nock from 'nock'
import sinon from 'sinon'

import Meta, { Default } from './Discussion.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Discussion', function () {
  let panoptesStub

  before(async function () {
    panoptesStub = sinon.stub(panoptes, 'get').resolves()

    await applyRequestHandlers(DefaultStory.parameters.msw)
  })
  
  beforeEach(function () {
    render(<DefaultStory {...Default.args} />)
  })

  after(function () {
    sinon.restore()
  })

  it('should show the discussion title', async function () {
    const title = await screen.findByText(Default.args.discussion.title)
    expect(title).to.exist()
  })

  it('should show a participants count', async function () {
    const participants = await screen.findByLabelText('Talk.participants')
    expect(participants).to.exist()
    const participantsCount = await screen.findByTestId('participants-count')
    expect(participantsCount.textContent).to.equal(Default.args.discussion.users_count.toString())
  })

  it('should show the comments count', async function () {
    const comments = await screen.findByLabelText('Talk.comments')
    expect(comments).to.exist()
    const commentsCount = await screen.findByTestId('comments-count')
    expect(commentsCount.textContent).to.equal(Default.args.discussion.comments_count.toString())  
  })

  it('should show a view full discussion link', async function () {
    const link = await screen.findByRole('link', { name: 'Talk.viewFullDiscussion' })
    expect(link).to.exist()
  })

  it('should show an up icon with aria-label "Comments newest first"', async function () {
    const upIcon = await screen.findByLabelText('Talk.commentsNewFirst')
    expect(upIcon).to.exist()
  })

  it('should show a button with aria-label "Sort by oldest first"', async function () {
    const sortButton = await screen.findByRole('button', { name: 'Talk.sortOldFirst' })
    expect(sortButton).to.exist()
  })

  describe('when the sort button is clicked', function () {
    it('should show a down icon with aria-label "Comments oldest first"', async function () {
      const sortButton = await screen.findByRole('button', { name: 'Talk.sortOldFirst' })
      sortButton.click()

      const downIcon = await screen.findByLabelText('Talk.commentsOldFirst')
      expect(downIcon).to.exist()
      const newSortButton = screen.getByRole('button', { name: 'Talk.sortNewFirst' })
      expect(newSortButton).to.exist()
    })
  })
})
