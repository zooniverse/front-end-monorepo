import { shallow } from 'enzyme'
import React from 'react'

import SubjectGroupViewer from './SubjectGroupViewer'
import InteractionLayer from '../InteractionLayer'

let wrapper

// TODO: REMINDER: REMOVE .ONLY
describe.only('Component > SubjectGroupViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SubjectGroupViewer height={200} width={100} viewBox='0 0 100 100' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
