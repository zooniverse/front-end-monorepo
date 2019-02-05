import { shallow } from 'enzyme'
import React from 'react'

import FavouritesButton from './FavouritesButton'

let wrapper

describe('Component > FavouritesButton', function () {
  before(function () {
    wrapper = shallow(<FavouritesButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
