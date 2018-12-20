import { mount } from 'enzyme'
import React from 'react'

import ZooniverseLogo from './ZooniverseLogo'

describe('ZooniverseLogo', function () {
  let wrapper
  const ID = 'foobar'
  const SIZE = '100px'

  before(function () {
    wrapper = mount(<ZooniverseLogo id={ID} size={SIZE} />)
  })

  it('should render without crashing', function () {})

  it('should use the `id` prop for `aria-labelledby` and `title`', function () {
    const labelledby = wrapper.find('svg').prop('aria-labelledby')
    const titleId = wrapper.find('title').prop('id')
    expect(labelledby).to.equal(ID)
    expect(titleId).to.equal(ID)
  })

  it('should set the height and width from the `size` prop', function () {
    const svg = wrapper.find('svg')
    expect(svg.prop('height')).to.equal(SIZE)
    expect(svg.prop('width')).to.equal(SIZE)
  })

  it('should pass through any other props to the SVG', function () {
    const FOO = 'bar'
    const wrapperWithProps = mount(
      <ZooniverseLogo
        id={ID}
        size={SIZE}
        foo={FOO}
      />
    )

    expect(wrapperWithProps.find('svg').prop('foo')).to.equal(FOO)
  })
})
