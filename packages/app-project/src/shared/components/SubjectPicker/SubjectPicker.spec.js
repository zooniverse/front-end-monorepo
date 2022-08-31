import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
import Link from 'next/link'
import nock from 'nock'
import zooTheme from '@zooniverse/grommet-theme'

import SubjectPicker, { StyledBox, SubjectDataTable } from './SubjectPicker'

describe('Components > Subject Picker', function () {
  let wrapper
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

  before(function () {
    wrapper = shallow(
      <SubjectPicker
        baseUrl="/workflow/12345"
        subjectSet={subjectSet}
        workflow={workflow}
      />
    )
  })

  it('should render', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the subject set name', function () {
    const displayName = wrapper.find(StyledBox)
    expect(displayName).to.be.ok()
  })

  describe('subject data table', function () {
    let wrapper

    before(async function () {
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
      wrapper = mount(
        <SubjectPicker
          baseUrl="/workflow/12345"
          subjectSet={subjectSet}
          workflow={workflow}
        />,
        { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
      )
      // workaround to wait for the mock API calls to resolve
      await new Promise((resolve) => setTimeout(resolve, 100));
    })

    it('should have column headings, including indexed subject fields', function () {
      const dataTable = wrapper.find(SubjectDataTable)
      const headers = dataTable.prop('columns').map(column => column.header)
      expect(headers).to.deep.equal(['subject_id', 'Date', 'Page', 'status'])
    })

    it('should have a row for each subject', function () {
      wrapper.update()
      const dataTable = wrapper.find(SubjectDataTable)
      expect(dataTable.prop('data').length).to.equal(3)
    })
  })

  describe('Back link', function () {
    let link

    before(function () {
      link = wrapper.find(Link).first()
    })

    it('should link to the base URL', function () {
      expect(link.prop('href')).to.equal('/workflow/12345')
    })
  })
})