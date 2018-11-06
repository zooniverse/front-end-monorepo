import { shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'mobx-react'
import ZoomOutButtonContainer from './ZoomOutButtonContainer'

describe('Component > ZoomOutButtonContainer', function () {
  it('should render without crashing', function () {
    shallow(<ZoomOutButtonContainer.wrappedComponent />)
  })
})
