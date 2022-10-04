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

    it('should use the `id` prop for `aria-labelledby` and `title`', function () {
      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      const titleElement = document.querySelector('title')

      expect(zooLogo.getAttribute('aria-labelledby')).to.equal(ID)
      expect(titleElement.getAttribute('id')).to.equal(ID)
    })

    it('should set the height and width from the `size` prop', function () {
      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('height')).to.equal(SIZE)
      expect(zooLogo.getAttribute('width')).to.equal(SIZE)
    })
  })

  describe('with additional props', function () {
    it('should pass through any other props to the SVG', function () {
      const FOO = 'bar'

      render(
        <ZooniverseLogo
          id={ID}
          size={SIZE}
          foo={FOO}
        />
      )

      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('foo')).to.equal(FOO)
    })
  })
})
