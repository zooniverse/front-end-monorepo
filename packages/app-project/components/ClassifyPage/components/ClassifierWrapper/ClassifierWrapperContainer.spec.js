import { shallow } from 'enzyme'
import React from 'react'

import ClassifierWrapperContainer from './ClassifierWrapperContainer'

describe('Component > ClassifyBox', function () {
  let wrapper
  let PROJECT_ID = '12345'

  before(function () {
    wrapper = shallow(<ClassifierWrapperContainer projectId={PROJECT_ID} />)
  })

  it('should render without crashing', function () {})
})
