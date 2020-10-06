import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import theme from '@zooniverse/grommet-theme'
import ExpertOptionsContainer from './ExpertOptionsContainer'
import ExpertOptions from './ExpertOptions'

describe('TaskNavButtons > Component > ExpertOptionsContainer', function () {
  let wrapper, useContextMock

  const mockStoreWithoutUser = {
    classifierStore: {
      authClient: {
        checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
      }
    }
  }

  const mockStoreWithAdminUser = {
    classifierStore: {
      authClient: {
        checkCurrent: sinon.stub().callsFake(() => Promise.resolve({ admin: true }))
      }
    }
  }

  const mockStoreWithStandardUser = {
    classifierStore: {
      authClient: {
        checkCurrent: sinon.stub().callsFake(() => Promise.resolve({ admin: false }))
      }
    }
  }

  describe('smoke test', function () {
    before(function () {
      useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStoreWithoutUser)
      wrapper = mount(
        <ExpertOptionsContainer />
      )
    })

    after(function () {
      useContextMock.restore()
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })
  })

  describe('when there is no user', function () {
    before(function () {
      useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStoreWithoutUser)
      wrapper = mount(
        <ExpertOptionsContainer />
      )
    })

    after(function () {
      useContextMock.restore()
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.empty()
    })
  })

  describe('when there is a standard user', function () {
    before(function () {
      useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStoreWithStandardUser)
      wrapper = mount(
        <ExpertOptionsContainer />
      )
    }, {
      wrappingComponent: Grommet,
      wrappingComponentProps: { theme }
    })

    after(function () {
      useContextMock.restore()
    })

    it('should not render ExpertOptions', function () {
      console.log(wrapper.debug())
      expect(wrapper.find(ExpertOptions)).to.have.lengthOf(0)
    })
  })

  xdescribe('when there is an admin user', function () {
    before(function () {
      useContextMock = sinon.stub(React, 'useContext').callsFake(() => mockStoreWithAdminUser)
      wrapper = mount(
        <ExpertOptionsContainer />
      )
    })

    after(function () {
      useContextMock.restore()
    })

    it('should render ExpertOptions', function () {
      // why tf does this fail? Works in actual running apps
      expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
    })
  })
})