import { shallow } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'

import StandardLayout from './StandardLayout'

describe('Component > StandardLayout', function () {
  let routerMock
  let wrapper

  before(function () {
    routerMock = {
      locale: 'en'
    }
    wrapper = shallow(<StandardLayout router={routerMock} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
