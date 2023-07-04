import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './FinishedAnnouncement.stories.js'

describe('Component > FinishedAnnouncementConnector', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show a results link if results page exists', function () {
    render(<DefaultStory />)
    const link = screen.findByLabelText('Announcements.FinishedAnnouncement.seeResults')
    expect(link).exists()
  })
})
