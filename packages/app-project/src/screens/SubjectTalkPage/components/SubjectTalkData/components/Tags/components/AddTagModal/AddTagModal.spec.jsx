import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default } from './AddTagModal.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Tags > AddTagModal', function () {
  it('should show the project display name', function () {
    render(<DefaultStory />)
    const projectName = screen.getByText('Talk.Tags.popularTagsFrom')
    expect(projectName).toBeDefined()
  })
  
  it('should show a list of tags', function () {
    render(<DefaultStory />)
    const tagList = screen.getByRole('list')
    expect(tagList).toBeDefined()
  })

  it('should show a tag button for each tag', function () {
    render(<DefaultStory />)
    const tagList = screen.getByRole('list')
    const tagButtons = tagList.querySelectorAll('button')
    expect(tagButtons.length).to.equal(10)
  })

  describe('when creating a new tag', function () {
    const user = userEvent.setup()
  
    it('should show an input for the new tag name', function () {
      render(<DefaultStory />)
      const input = screen.getByRole('textbox', { name: 'Talk.Tags.createTag' })
      expect(input).toBeDefined()
    })

    describe('with an invalid tag name', function () {
      it('should show the validation message on submit', async function () {
        render(<DefaultStory />)
        const input = screen.getByRole('textbox', { name: 'Talk.Tags.createTag' })
        await user.type(input, 'invalid tag name!')
        const submit = screen.getByRole('button', { name: 'Talk.Tags.add' })
        await user.click(submit)
        
        const validationMessage = screen.getByText('Talk.Tags.tagValidationMessage')
        expect(validationMessage).toBeTruthy()
      })
    })
  })
})
