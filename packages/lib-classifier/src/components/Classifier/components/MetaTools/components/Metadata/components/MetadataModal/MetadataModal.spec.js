import { render } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { Default } from './MetadataModal.stories'
import { composeStory } from '@storybook/testing-react'
import { within } from '@testing-library/dom'

describe('MetadataModal', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the correct number of table rows', function () {
    render(<DefaultStory />)
    const tableBody = document.querySelector('tbody')
    const rows = within(tableBody).getAllByRole('row')
    expect(rows).to.have.lengthOf(3)
  })
})
