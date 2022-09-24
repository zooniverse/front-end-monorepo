import { Grommet } from 'grommet'
import Link from 'next/link'
import nock from 'nock'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'

import SubjectPicker, { StyledBox, SubjectDataTable } from './SubjectPicker'

describe('Components > Subject Picker', function () {
  let columnHeadings, displayName, link, tableRows

  function Wrapper({ children }) {
    return (
      <Grommet theme={zooTheme}>
        {children}
      </Grommet>
    )
  }

  const workflow = {
    id: '123345'
  }
  const subjectSet = {
    id: '4567',
    display_name: 'Test subject set',
    metadata: {
      indexFields: 'Date,Page'
    }
  }

  before(async function () {
    // allow a generous timeout for subject data to load.
    this.timeout(10000)

    const columns = [
      'subject_id',
      'Page',
      'Date'
    ]
    const rows = [
      [1, '43', '23 January 1916'],
      [2, '44', '24 January 1916'],
      [3, '45', '25 January 1916']
    ]
    nock('https://subject-set-search-api.zooniverse.org/subjects')
    .get('/4567.json')
    .query(true)
    .reply(200, {
      columns,
      rows
    })
    nock('https://panoptes-staging.zooniverse.org/api')
    .get('/subjects/selection')
    .query(true)
    .reply(200, {
      subjects: [
        { id: 1, already_seen: false, retired: false },
        { id: 2, already_seen: true, retired: false },
        { id: 3, already_seen: true, retired: true }
      ]
    })
    render(
      <SubjectPicker
        baseUrl="/workflow/12345"
        subjectSet={subjectSet}
        workflow={workflow}
      />,
      { wrapper: Wrapper }
    )
    // workaround to wait for the mock API calls to resolve
    await new Promise((resolve) => setTimeout(resolve, 100));
    displayName = screen.getByText(subjectSet.display_name)
    link = screen.getByRole('link', { name: 'SubjectPicker.back' })
    const dataTable = screen.getByRole('table')
    const [ tableHeader, tableContent ] = within(dataTable).getAllByRole('rowgroup')
    columnHeadings = within(tableHeader).getByRole('row', {
      name: 'subject_id Date FormSearch Page FormSearch status'
    })
    const subjects = [
      '1 23 January 1916 43 SubjectPicker.unclassified',
      '2 24 January 1916 44 SubjectPicker.alreadySeen',
      '3 25 January 1916 45 SubjectPicker.retired'
    ]
    tableRows = subjects.map(subject => within(tableContent).getByRole('row', { name: subject }))
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
    expect(link.href).to.equal('https://localhost/workflow/12345')
  })
})
