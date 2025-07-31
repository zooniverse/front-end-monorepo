import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, MissingUrl } from './Publication.stories'

describe('Publications > Publication', function () {
  const DefaultStory = composeStory(Default, Meta)
  const MissingUrlStory = composeStory(MissingUrl, Meta)

  it('should render the publication title, authors, and year if present', function () {
    render(<DefaultStory />)
    const { title, authors, year } = Default.args
    const displayString = screen.getByText(`${title}, ${authors}, ${year}`)
    expect(displayString).toBeTruthy()
  })

  it('should render a link to the publication if url is present', function () {
    render(<DefaultStory />)
    const link = screen.getByRole('link')
    expect(link.href).includes(Default.args.url)
  })

  it('should render only text if url is not present', function () {
    render(<MissingUrlStory />)
    const link = screen.queryByRole('link')
    expect(link).to.equal(null)
  })
})
