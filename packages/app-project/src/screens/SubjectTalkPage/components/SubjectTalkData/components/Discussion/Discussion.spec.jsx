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
    render(<DefaultStory />)
  })

  after(function () {
    sinon.restore()
  })

  it('should show a link to the related board', function () {
    const boardLink = screen.getByRole('link', { name: 'Test Board' })
    expect(boardLink).toBeDefined()
  })

  it('should show a link to the discussion', function () {
    const discussionLink = screen.getByRole('link', { name: 'Test Discussion' })
    expect(discussionLink).toBeDefined()
  })

  it('should show a "Newest First" button', function () {
    const sortButton = screen.getByRole('button', { name: 'Talk.Discussions.sortedNewestFirst' })
    expect(sortButton).toBeDefined()
  })

  describe('when the sort button is clicked', function () {
    it('should show an "Oldest First" button', async function () {
      const sortButton = screen.getByRole('button', { name: 'Talk.Discussions.sortedNewestFirst' })
      expect(sortButton).toBeDefined()
      fireEvent.click(sortButton)
      await waitFor(() => {
        const newSortButton = screen.getByRole('button', { name: 'Talk.Discussions.sortedOldestFirst' })
        expect(newSortButton).toBeDefined()
      })
    })
  })
})
