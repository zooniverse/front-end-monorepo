import { render, screen } from '@testing-library/react'

import ZooniverseLogotype from './ZooniverseLogotype'

describe('ZooniverseLogotype', function () {
  let wrapper
  const ID = 'foobar'
  const WIDTH = 100
  const CALCULATED_WIDTH = '100'
  const CALCULATED_HEIGHT = '11.525186950447859'

  describe('with standard props', function () {
    beforeEach(function () {
      render(
        <ZooniverseLogotype id={ID} width={WIDTH} />
      )
    })

    it('should render without crashing', function () {
      expect(screen).to.be.ok()
    })

    it('should set the height and width from the `width` prop', function () {
      const zooLogo = screen.getByLabelText('Zooniverse')  // Gets the SVG
      expect(zooLogo.getAttribute('width')).to.equal(CALCULATED_WIDTH)
      expect(zooLogo.getAttribute('height')).to.equal(CALCULATED_HEIGHT)
    })
  })

  describe('with additional props', function () {
    it('should pass through any other props to the SVG', function () {
      render(
        <ZooniverseLogotype
          id={ID}
          width={WIDTH}
          transform={'scale(2)'}
        />
      )

      const zooLogo = screen.getByLabelText('Zooniverse')  // Gets the SVG
      expect(zooLogo.getAttribute('transform')).to.equal('scale(2)')
    })
  })
})
