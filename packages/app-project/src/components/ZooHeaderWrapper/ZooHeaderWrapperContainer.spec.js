import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import auth from 'panoptes-client/lib/auth'

import ZooHeaderWrapperContainer from './ZooHeaderWrapperContainer'

let wrapper

describe('Component > ZooHeaderWrapperContainer', function () {
  const user = {
    id: 'test',
    clear: sinon.stub()
  }

  before(function () {
    sinon.stub(auth, 'signOut').callsFake(() => Promise.resolve())
    wrapper = shallow(<ZooHeaderWrapperContainer.wrappedComponent
      user={user}
    />)
  })

  after(function () {
    auth.signOut.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should clear the user prop on sign out', function (done) {
    wrapper.instance().signOut().then(function () {
      expect(user.clear).to.have.been.calledOnce()
    })
      .then(done, done)
  })
})
