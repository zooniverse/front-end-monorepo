import { composeStories } from '@storybook/react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'

describe('Component > AboutDropdownNav', function () {
  const { MoreLinks } = composeStories(stories)

  it('should render links passed in the aboutNavLinks array', async function () {
    render(<MoreLinks />)
    fireEvent.click(screen.getByRole('button'))
		await waitFor(() => {
			const links = screen.getAllByRole('link')
			expect(links).to.have.lengthOf(4)
			expect(screen.getByText('About.PageHeading.title.education')).toBeDefined()
			expect(screen.getByText('About.PageHeading.title.faq')).toBeDefined()
		});
  })
})
