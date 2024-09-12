import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, Dismissable } from './GenericAnnouncement.stories.js'

describe('Component > GenericAnnouncement', function () {
	it('should render the GenericProjectAnnouncement component without a close button', function () {
		const DefaultStory = composeStory(Default, Meta)
		render(<DefaultStory />)
		expect(screen.findByText(DefaultStory.args.announcement)).to.exist();
		expect(screen.queryByRole('button', { name: 'close' })).to.be.null()
	})

	it('should render the GenericProjectAnnouncement component with a close button', function () {
		const DismissableStory = composeStory(Dismissable, Meta)
		render(<DismissableStory />)
		expect(screen.findByText(Dismissable.args.announcement)).to.exist();
		expect(screen.findByRole('button', { name: 'close' })).to.be.ok()
	})
})
