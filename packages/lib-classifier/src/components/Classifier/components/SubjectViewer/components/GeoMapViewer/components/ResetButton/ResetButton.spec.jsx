import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './ResetButton.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > ResetButton', function () {
	it('should show the reset button with accessible name', function () {
		render(<DefaultStory />)
		expect(
			screen.getByRole('button', { name: 'Reset features on map' })
		).to.exist
	})
})
