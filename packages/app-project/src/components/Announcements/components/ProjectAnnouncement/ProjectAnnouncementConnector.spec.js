import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, mockStore } from './ProjectAnnouncement.stories.js'

describe('Component > ProjectAnnouncementConnector', function () {
	it('should render the ProjectAnnouncement component', function () {
		const DefaultStory = composeStory(Default, Meta)
		render(<DefaultStory />)
		expect(screen.findByText(mockStore.project.configuration.announcement)).to.exist();
		expect(screen.queryByRole('button', { name: 'Close' })).to.exist()
	})
})