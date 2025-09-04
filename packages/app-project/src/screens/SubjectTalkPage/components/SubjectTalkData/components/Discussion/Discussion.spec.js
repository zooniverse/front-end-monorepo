import { composeStory } from '@storybook/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { panoptes } from '@zooniverse/panoptes-js'
import { applyRequestHandlers } from 'msw-storybook-addon'
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

  it('should show a link to the related board', async function () {
    const boardLink = await screen.getByRole('link', { name: 'Test Board' })
    expect(boardLink).to.exist()
  })

  it('should show a link to the discussion', async function () {
    const discussionLink = await screen.getByRole('link', { name: 'Test Discussion' })
    expect(discussionLink).to.exist()
  })

  it('should show a "Newest First" button', async function () {
    const sortButton = await screen.getByRole('button', { name: 'Talk.sortedNewestFirst' })
    expect(sortButton).to.exist()
  })

  describe('when the sort button is clicked', function () {
    it('should show an "Oldest First" button', async function () {
      const sortButton = await screen.getByRole('button', { name: 'Talk.sortedNewestFirst' })
      expect(sortButton).to.exist()
      fireEvent.click(sortButton)
      await waitFor(() => {
        const newSortButton = screen.getByRole('button', { name: 'Talk.sortedOldestFirst' })
        expect(newSortButton).to.exist()
      })
    })
  })
})
