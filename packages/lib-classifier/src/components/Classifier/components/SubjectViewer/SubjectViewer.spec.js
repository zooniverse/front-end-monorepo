import { shallow } from 'enzyme'
import React from 'react'
import SubjectViewer from './SubjectViewer'
import subjects from '../../../../../test/fixtures/subjects'

describe('Component > SubjectViewer', function () {
  it('should render without crashing', function () {
    shallow(<SubjectViewer />)
  })

  it('should render nothing if there is no currentSubject prop', function () {
    const wrapper = shallow(<SubjectViewer />)
    expect(wrapper.get(0)).to.equal(null)
  })

  it('should render a viewer component if passed a currentSubject', function () {
    const currentSubject = subjects.body.subjects[0]
    const wrapper = shallow(<SubjectViewer currentSubject={currentSubject} />)
    const viewers = wrapper.find('[url]')
    viewers.length.should.equal(1)
  })
})
