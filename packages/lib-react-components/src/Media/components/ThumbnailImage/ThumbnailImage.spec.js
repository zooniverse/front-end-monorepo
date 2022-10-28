import { render, screen } from '@testing-library/react'
import React from 'react'
import sinon from 'sinon'

import ThumbnailImage from './ThumbnailImage.js'

const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'

describe('ThumbnailImage', function () {
  let oldImage

  class ValidImage {
    constructor () {
      this.naturalHeight = 200
      this.naturalWidth = 400
      setTimeout(() => this.onload(), 0)
    }
  }

  before(function () {
    sinon.replace(window, 'Image', ValidImage)
  })

  after(function () {
    sinon.restore()
  })

  it('should render without crashing', async function () {
    render(<ThumbnailImage alt='a test image' src={src} />)
    const image = await screen.findByRole('img', { name: 'a test image' })
    expect(image).to.be.ok()
  })

  it('should use alt text to describe the image.', async function () {
    const alt = "A galaxy"
    render(<ThumbnailImage alt={alt} src={src} />)
    const image = await screen.findByRole('img', { name: alt })
    expect(image).to.be.ok()
  })

  it('should render the Placeholder component if loading', function () {
    render(<ThumbnailImage src={src} />)
    expect(screen.queryByRole('img')).to.be.null()
  })

  it('should delay loading the image the given time in props.delay', function (done) {
    const delay = 1000
    render(<ThumbnailImage alt='a test image' delay={delay} src={src} />)
    setTimeout(function () {
      const image = screen.findByRole('img', { name: 'a test image' })
      expect(image).to.be.ok()
      done()
    }, delay + 1)
  })

  it('should have a `<noscript />` image for SSR', function () {
    render(<ThumbnailImage src={src} />)
    const noscriptWrapper = document.querySelector('noscript')
    expect(noscriptWrapper).to.exist()
  })

  describe('height and width', function () {
    it('should be set if specified', async function () {
      render(<ThumbnailImage alt='a test image' height={200} width={270} src={src} />)
      const image = await screen.findByRole('img', { name: 'a test image' })
      const imageWrapper = document.querySelector('div.thumbnailImage')
      const { maxHeight, maxWidth } = window.getComputedStyle(imageWrapper)
      expect(maxHeight).to.equal('200px')
      expect(maxWidth).to.equal('270px')
    })

    it('should default to 999', async function () {
      render(<ThumbnailImage alt='a test image' src={src} />)
      const image = await screen.findByRole('img', { name: 'a test image' })
      const imageWrapper = document.querySelector('div.thumbnailImage')
      const { maxHeight, maxWidth } = window.getComputedStyle(imageWrapper)
      expect(maxHeight).to.equal('999px')
      expect(maxWidth).to.equal('999px')
    })
  })
})
