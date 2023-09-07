import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, Dismissable } from './GenericAnnouncement.stories.js'
import { AnnouncementText } from './GenericAnnouncement.mock'

describe('Component > ProjectAnnouncement', function () {
	it('should render the GenericProjectAnnouncement component without a close button', function () {
		const DefaultStory = composeStory(Default, Meta)
		render(<DefaultStory />)
		expect(screen.findByText(AnnouncementText)).to.exist();
		expect(screen.queryByRole('button', { name: 'close' })).to.be.null()
	})

	it('should render the GenericProjectAnnouncement component with a close button', function () {
		const DismissableStory = composeStory(Dismissable, Meta)
		render(<DismissableStory />)
		expect(screen.findByText(AnnouncementText)).to.exist();
		expect(screen.findByRole('button', { name: 'close' })).to.be.ok()
	})
})
