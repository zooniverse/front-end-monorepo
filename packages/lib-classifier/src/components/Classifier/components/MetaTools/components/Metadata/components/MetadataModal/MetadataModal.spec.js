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

  describe('with undefined filters', function () {
    it('should render the correct number of table rows', function () {
      render(
        <DefaultStory
          filters={undefined}
        />
      )
      const tableBody = document.querySelector('tbody')
      const rows = within(tableBody).getAllByRole('row')

      // the DefaultStory mock subject metadata includes 5 items, 2 of which should be filtered/hidden per default filters, leaving 3 rows rendered
      expect(rows).to.have.lengthOf(3)
    })
  })
})
