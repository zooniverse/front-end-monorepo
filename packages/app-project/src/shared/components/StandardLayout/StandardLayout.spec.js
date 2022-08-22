import { shallow } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'

import StandardLayout from './StandardLayout'

describe('Component > StandardLayout', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<StandardLayout />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
