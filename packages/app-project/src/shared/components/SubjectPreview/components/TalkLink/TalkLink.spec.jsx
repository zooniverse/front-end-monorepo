import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { TalkLink } from './TalkLink.stories'

describe('Component > TalkLink', function () {
  beforeEach(function () {
    const TalkLinkStory = composeStory(TalkLink, Meta)
    render(<TalkLinkStory />)
  })

  it('should display a Talk icon', function () {
    expect(screen.getByTestId('talk-icon', { hidden: true })).toBeDefined()
  })

  it('should link to the subject Talk page', function () {
    expect(screen.getByText('SubjectPreview.TalkLink.label')).toBeDefined()
  })
})
