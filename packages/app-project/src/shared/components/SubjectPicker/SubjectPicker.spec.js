import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default } from './SubjectPicker.stories.js'

describe('Components > Subject Picker', function () {
  let columnHeadings, displayName, link, tableRows

  before(async function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    displayName = await screen.findByText('Anti-Slavery Letters: 1800-1839')
    link = screen.getByRole('link', { name: 'SubjectPicker.back' })
    const dataTable = screen.getByRole('table')
    const [ tableHeader, tableContent ] = within(dataTable).getAllByRole('rowgroup')
    columnHeadings = within(tableHeader).getByRole('row', {
      name: 'subject_id date FormSearch page FormSearch status'
    })
    const subjects = [
      '23 January 1916',
      '24 January 1916',
      '25 January 1916'
    ]
    tableRows = []
    subjects.forEach(async subject => {
      const row = await within(tableContent).findByText(subject)
      tableRows.push(row)
    })
    await Promise.all(tableRows)
  })

  it('should show the subject set name', function () {
    expect(displayName).to.exist()
  })

  it('should have column headings, including indexed subject fields', function () {
    expect(columnHeadings).to.exist()
  })

  it.skip('should have a row for each subject', function () {
    expect(tableRows.length).to.equal(3)
  })

  it('should link to the base URL', function () {
    expect(link.href).to.equal('https://localhost/projects/test-owner/test-project/classify/workflow/12345')
  })
})
