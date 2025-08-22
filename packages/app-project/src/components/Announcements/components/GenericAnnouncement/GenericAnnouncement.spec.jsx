import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, Dismissable } from './GenericAnnouncement.stories'

describe('Component > GenericAnnouncement', function () {
	it('should render the GenericProjectAnnouncement component without a close button', function () {
		const DefaultStory = composeStory(Default, Meta)
		render(<DefaultStory />)
		expect(screen.findByText(DefaultStory.args.announcement)).toBeDefined()
		expect(screen.queryByRole('button', { name: 'close' })).to.equal(null)
	})

	it('should render the GenericProjectAnnouncement component with a close button', function () {
		const DismissableStory = composeStory(Dismissable, Meta)
		render(<DismissableStory />)
		expect(screen.findByText(Dismissable.args.announcement)).toBeDefined()
		expect(screen.findByRole('button', { name: 'close' })).to.equal(null)
	})
})
