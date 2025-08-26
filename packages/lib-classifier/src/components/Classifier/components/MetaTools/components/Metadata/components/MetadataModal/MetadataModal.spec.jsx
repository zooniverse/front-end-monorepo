import { render } from '@testing-library/react'
import Meta, { Default } from './MetadataModal.stories'
import { composeStory } from '@storybook/react'
import { within } from '@testing-library/dom'

describe('MetadataModal', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the correct number of table rows', function () {
    render(<DefaultStory />)
    const tableBody = document.querySelector('tbody')
    const rows = within(tableBody).getAllByRole('row')
    // the DefaultStory mock subject metadata includes 5 items, 2 of which should be filtered/hidden per default filters, leaving 3 rows rendered
    expect(rows).to.have.lengthOf(3)
  })

  describe('with no filters on metadata keys', function () {
    it('should render the correct number of table rows', function () {
      render(
        <DefaultStory
          filters={[]}
        />
      )
      const tableBody = document.querySelector('tbody')
      const rows = within(tableBody).getAllByRole('row')

      expect(rows).to.have.lengthOf(5)
    })
  })
})
