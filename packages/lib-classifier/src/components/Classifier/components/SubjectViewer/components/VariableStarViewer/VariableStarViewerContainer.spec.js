import { shallow } from 'enzyme'
import React from 'react'
import nock from 'nock'
import sinon from 'sinon'

import { VariableStarViewerContainer } from './VariableStarViewerContainer'
import variableStar from '../../helpers/mockLightCurves/variableStar'
import { Factory } from 'rosie'

describe('Component > VariableStarViewerContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewerContainer />)
    expect(wrapper).to.be.ok()
  })
})