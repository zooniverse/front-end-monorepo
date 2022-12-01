import { expect } from 'chai'
import { render, screen } from '@testing-library/react'

import SVGImage from './SVGImage'

describe('SVGImage', function () {
  it('should render an image', function () {
    render(
      <SVGImage
        naturalHeight={100}
        naturalWidth={100}
        src='https://some.domain/image.jpg'
        subjectID='1234'
      />
    )

    const image = screen.getByRole('img', { name: 'Subject 1234' })
    expect(image).to.exist()
    expect(image.getAttribute('href')).to.equal('https://some.domain/image.jpg')
    expect(image.getAttribute('filter')).to.be.null()
  })

  describe('with invert', function () {
    it('should render an image with a defined filter attribute', function () {
      render(
        <SVGImage
          invert
          naturalHeight={100}
          naturalWidth={100}
          src='https://some.domain/image.jpg'
          subjectID='1234'
        />
      )

      const filter = document.querySelector('filter')
      expect(filter).to.exist()
      expect(filter.getAttribute('id')).to.equal('svg-invert-filter')

      const image = screen.getByRole('img', { name: 'Subject 1234' })
      expect(image).to.exist()
      expect(image.getAttribute('filter')).to.equal('url("#svg-invert-filter")')
    })
  })
})
