import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { applyRequestHandlers } from 'msw-storybook-addon'
import nock from 'nock'

import Meta, { Default } from './SubjectPicker.stories.js'

describe('Components > Subject Picker', function () {
  let columnHeadings, displayName, link, tableRows

  before(async function () {
    nock('https://panoptes-staging.zooniverse.org')
      .get('/api/subjects/selection')
      .query(true)
      .reply(200, {
        subjects: [
          { id: 1, already_seen: false, retired: false },
          { id: 2, already_seen: true, retired: false },
          { id: 3, already_seen: true, retired: true }
        ]
      })
    const DefaultStory = composeStory(Default, Meta)
    await applyRequestHandlers(DefaultStory.parameters.msw)
    render(<DefaultStory />)
    displayName = await screen.findByText('Anti-Slavery Letters: 1800-1839')
    link = screen.getByRole('link', { name: 'SubjectPicker.back' })
    const dataTable = screen.getByRole('table')
    const [ tableHeader, tableContent ] = within(dataTable).getAllByRole('rowgroup')
    columnHeadings = within(tableHeader).getByRole('row', {
      name: 'subject_id date FormSearch page FormSearch status'
    })
    const subjects = [
      '1 23 January 1916 43 SubjectPicker.unclassified',
      '2 24 January 1916 44 SubjectPicker.alreadySeen',
      '3 25 January 1916 45 SubjectPicker.retired'
    ]
    tableRows = subjects.map(async subject => await within(tableContent).findByRole('row', { name: subject }))
    await Promise.all(tableRows)
  })

  it('should show the subject set name', function () {
    expect(displayName).to.exist()
  })

  it('should have column headings, including indexed subject fields', function () {
    expect(columnHeadings).to.exist()
  })

  it('should have a row for each subject', function () {
    expect(tableRows.length).to.equal(3)
  })

  it('should link to the base URL', function () {
    expect(link.href).to.equal('https://localhost/projects/test-owner/test-project/classify/workflow/12345')
  })
})
