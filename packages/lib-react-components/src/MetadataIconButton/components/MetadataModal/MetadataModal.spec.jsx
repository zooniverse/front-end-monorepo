import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'

import Meta, { Default } from './MetadataModal.stories'

describe('MetadataModal', function() {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the correct number of table rows', function() {
    render(<DefaultStory />)

    const tableBody = screen.getByRole('table').querySelector('tbody')
    const rows = within(tableBody).getAllByRole('row')

    // mock metadata includes 5 items, 2 hidden by default filters, so 3 rows should render
    expect(rows).to.have.lengthOf(3)
  })

  describe('with no filters on metadata keys', function() {
    it('should render the correct number of table rows', function() {
      render(<DefaultStory filters={[]} prefixes={[]} />)

      const tableBody = screen.getByRole('table').querySelector('tbody')
      const rows = within(tableBody).getAllByRole('row')

      expect(rows).to.have.lengthOf(5)
    })
  })

  it('should render visible key-value rows from metadata', function() {
    render(<DefaultStory />)

    expect(screen.getByText('id')).toBeDefined()
    expect(screen.getByText('href')).toBeDefined()
    expect(screen.getByRole('link', { name: 'https://zooniverse.org' })).toBeDefined()
    expect(screen.getByText('foo')).toBeDefined()
    expect(screen.getByText('null')).toBeDefined()
  })
})