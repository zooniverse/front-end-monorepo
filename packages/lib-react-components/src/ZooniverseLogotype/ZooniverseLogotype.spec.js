import React from 'react'
import { render, screen } from '@testing-library/react'

import ZooniverseLogotype from './ZooniverseLogotype'

describe('ZooniverseLogotype', function () {
  let wrapper
  const ID = 'foobar'
  const WIDTH = 100

  describe('with standard props', function () {
    beforeEach(function () {
      wrapper = render(
        <ZooniverseLogotype id={ID} width={WIDTH} />
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

    it('should set the width from the `width` prop', function () {
      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(parseInt(zooLogo.getAttribute('width'))).to.equal(WIDTH)
    })

    it('should calculate the height', function () {
      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('height')).to.be.ok()
    })
  })

  describe('with additional props', function () {
    it('should pass through any other props to the SVG', function () {
      const FOO = 'bar'

      render(
        <ZooniverseLogotype
          id={ID}
          width={WIDTH}
          foo={FOO}
        />
      )

      const zooLogo = screen.getByLabelText('Zooniverse Logo')  // Gets the SVG
      expect(zooLogo.getAttribute('foo')).to.equal(FOO)
    })
  })
})
