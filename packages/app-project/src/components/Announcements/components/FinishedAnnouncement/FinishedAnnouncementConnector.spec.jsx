import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './FinishedAnnouncement.stories'

describe('Component > FinishedAnnouncementConnector', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show a results link if results page exists', async function () {
    render(<DefaultStory />)
    const link = await screen.findByRole('link', { name: 'Announcements.FinishedAnnouncement.seeResults' })
    expect(link).exists()
    expect(link?.getAttribute('href')).to.equal('/projects/zookeeper/galaxy-zoo/about/results')
  })
})
