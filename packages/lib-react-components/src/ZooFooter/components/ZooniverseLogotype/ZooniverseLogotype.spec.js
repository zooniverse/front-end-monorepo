import { mount } from 'enzyme'
import React from 'react'

import ZooniverseLogotype from './ZooniverseLogotype'

describe('ZooniverseLogotype', function () {
  let wrapper
  const ID = 'foobar'
  const WIDTH = 100

  before(function () {
    wrapper = mount(<ZooniverseLogotype id={ID} width={WIDTH} />)
  })

  it('should render without crashing', function () {})

  it('should use the `id` prop for `aria-labelledby` and `title`', function () {
    const labelledby = wrapper.find('svg').prop('aria-labelledby')
    const titleId = wrapper.find('title').prop('id')
    expect(labelledby).to.equal(ID)
    expect(titleId).to.equal(ID)
  })

  it('should set the width from the `width` prop', function () {
    const svg = wrapper.find('svg')
    expect(svg.prop('width')).to.equal(WIDTH)
  })

  it('should calculate the height', function () {
    const svg = wrapper.find('svg')
    expect(svg.prop('height')).to.be.ok
  })

  it('should pass through any other props to the SVG', function () {
    const FOO = 'bar'
    const wrapperWithProps = mount(
      <ZooniverseLogotype
        id={ID}
        width={WIDTH}
        foo={FOO}
      />
    )

    expect(wrapperWithProps.find('svg').prop('foo')).to.equal(FOO)
  })
})
