import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
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
    const tagButtons = screen.getAllByRole('button')
    expect(tagButtons.length).to.equal(8)
  })

  it('should call the onTagClick handler when a tag is clicked', function () {
    onTagClickSpy = sinon.spy()
    render(<DefaultStory onTagClick={onTagClickSpy} />)
    const tagButton = screen.getByRole('button', { name: 'galaxy 3' })
    tagButton.click()
    sinon.assert.calledOnce(onTagClickSpy)
  })

  describe('when the user is logged out', function () {
    it('should not call the onTagClick handler when a tag is clicked', function () {
      onTagClickSpy = sinon.spy()
      render(<LoggedOutStory onTagClick={onTagClickSpy} />)
      const tagButton = screen.getByRole('button', { name: 'galaxy 3' })
      tagButton.click()
      sinon.assert.notCalled(onTagClickSpy)
    })
  })
})
