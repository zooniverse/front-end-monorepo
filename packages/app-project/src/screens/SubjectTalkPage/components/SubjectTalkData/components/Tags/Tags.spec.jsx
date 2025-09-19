import { composeStory } from '@storybook/react'
import { render, screen, within } from '@testing-library/react'
import sinon from 'sinon'

import Meta, { Default, LoggedOut } from './Tags.stories'

const DefaultStory = composeStory(Default, Meta)
const LoggedOutStory = composeStory(LoggedOut, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Tags', function () {
  let onTagClickSpy

  it('should show a list of tags', function () {
    render(<DefaultStory />)
    const tagList = screen.getByRole('list')
    expect(tagList).toBeDefined()
  })

  it('should show a tag button for each tag', function () {
    render(<DefaultStory />)
    const tagList = screen.getByRole('list')
    const tagButtons = within(tagList).getAllByRole('button')
    expect(tagButtons.length).to.equal(8)
  })

  it('should call the onTagClick handler when a tag is clicked', function () {
    onTagClickSpy = sinon.spy()
    render(<DefaultStory onTagClick={onTagClickSpy} />)
    const tagButton = screen.getByRole('button', { name: 'galaxy 3' })
    tagButton.click()
    sinon.assert.calledOnce(onTagClickSpy)
  })

  it('should show an add tag button', function () {
    render(<DefaultStory />)
    const addTagButton = screen.getByRole('button', { name: 'Tag Talk.Tags.addATag' })
    expect(addTagButton).toBeDefined()
  })

  describe('when the user is logged out', function () {
    it('should not call the onTagClick handler when a tag is clicked', function () {
      onTagClickSpy = sinon.spy()
      render(<LoggedOutStory onTagClick={onTagClickSpy} />)
      const tagButton = screen.getByRole('button', { name: 'galaxy 3' })
      tagButton.click()
      sinon.assert.notCalled(onTagClickSpy)
    })

    it('should show a log in message', function () {
      render(<LoggedOutStory />)
      const signInMessage = screen.getByText('Talk.Tags.signInToTag')
      expect(signInMessage).toBeDefined()
    })
  })

  describe('when there are no tags', function () {
    it('should show the no tags heading', function () {
      render(<DefaultStory tags={[]} />)
      const noTagsMessage = screen.getByText('Talk.Tags.noTags')
      expect(noTagsMessage).toBeDefined()
    })

    it('should show an add tag button', function () {
      render(<DefaultStory tags={[]} />)
      const addTagButton = screen.getByRole('button', { name: 'Tag Talk.Tags.addATag Add' })
      expect(addTagButton).toBeDefined()
    })
  })
})
