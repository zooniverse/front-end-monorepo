import React from 'react'
import { render, screen } from '@testing-library/react'

import ZooniverseLogo from './ZooniverseLogo'

describe('ZooniverseLogo', function () {
  let wrapper
  const ID = 'foobar'
  const SIZE = '100px'

  describe('with standard props', function () {
    beforeEach(function () {
      render(
        <ZooniverseLogo id={ID} size={SIZE} />
      )
    })

    it('should render without crashing', function () {
      expect(screen).to.be.ok()
    })

    it('should set the height and width from the `size` prop', function () {
      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('height')).to.equal(SIZE)
      expect(zooLogo.getAttribute('width')).to.equal(SIZE)
    })
  })

  describe('with additional props', function () {
    it('should pass through any other props to the SVG', function () {
      render(
        <ZooniverseLogo
          id={ID}
          size={SIZE}
          transform={'scale(2)'}
        />
      )

      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('transform')).to.equal('scale(2)')
    })
  })
})
