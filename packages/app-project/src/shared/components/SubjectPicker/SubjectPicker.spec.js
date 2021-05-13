import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
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
        baseUrl="/workflow/12345/subject-set/4567"
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
        ['1', '43', '23 January 1916'],
        ['2', '44', '24 January 1916'],
        ['3', '45', '25 January 1916']
      ]
      nock('https://subject-set-search-api.zooniverse.org/subjects')
      .get('/4567.json')
      .query(true)
      .reply(200, {
        columns,
        rows
      })
      nock('https://panoptes-staging.zooniverse.org/api')
      .get('/subject_workflow_statuses')
      .query(true)
      .reply(200, {
        subject_workflow_statuses: [
          { classifications_count: 0, retired_at: null, links: { subject: '1' }},
          { classifications_count: 3, retired_at: null, links: { subject: '2' }},
          { classifications_count: 5, retired_at: "2018-01-30T21:09:49.396Z", links: { subject: '3' }}
        ]
      })
      wrapper = mount(
        <SubjectPicker
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
})