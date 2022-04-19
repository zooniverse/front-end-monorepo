import { shallow } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'

import StandardLayout from './StandardLayout'

describe('Component > StandardLayout', function () {
  let routerMock
  let wrapper

  before(function () {
    routerMock = sinon.stub(Router, 'useRouter').callsFake(() => {
      return {
        locale: 'en'
      }
    })
    wrapper = shallow(<StandardLayout />)
  })

  after(function () {
    routerMock.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
