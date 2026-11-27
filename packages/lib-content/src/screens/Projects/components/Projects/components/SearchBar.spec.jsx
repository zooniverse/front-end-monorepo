import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import SearchBar from './SearchBar'

describe('Component > Projects > SearchBar', function () {
  function renderSearchBar() {
    const handleSearch = vi.fn()
    const onPageSubmit = vi.fn()
    render(
      <Grommet theme={zooTheme}>
        <div onSubmit={onPageSubmit}>
          <SearchBar handleSearch={handleSearch} value='galaxies' />
        </div>
      </Grommet>
    )
    return { handleSearch, onPageSubmit }
  }

  it('should be a search form', function () {
    renderSearchBar()
    const form = screen.getByRole('search')
    expect(form.tagName).to.equal('FORM')
    expect(form.contains(screen.getByRole('textbox'))).to.equal(true)
  })

  it('should handle Enter without reloading the page', async function () {
    const user = userEvent.setup()
    const { onPageSubmit } = renderSearchBar()
    const input = screen.getByRole('textbox')
    await user.click(input)
    expect(document.activeElement).to.equal(input)

    await user.keyboard('{Enter}')

    expect(onPageSubmit).toHaveBeenCalledOnce()
    expect(onPageSubmit.mock.calls[0][0].defaultPrevented).to.equal(true)
    // Leaving the input closes the on-screen keyboard on phones and tablets.
    expect(document.activeElement).not.to.equal(input)
  })
})
