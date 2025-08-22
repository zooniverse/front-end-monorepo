import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, mockStore } from './ProjectAnnouncement.stories'

describe('Component > ProjectAnnouncementConnector', function () {
	it('should render the ProjectAnnouncement component', function () {
		const DefaultStory = composeStory(Default, Meta)
		render(<DefaultStory />)
		expect(screen.findByText(mockStore.project.configuration.announcement)).toBeDefined()
		expect(screen.queryByRole('button', { name: 'Close' })).toBeDefined()
	})
})
