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
})
