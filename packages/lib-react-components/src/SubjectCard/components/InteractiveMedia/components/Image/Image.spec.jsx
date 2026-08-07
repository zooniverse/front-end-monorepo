import { render, screen } from '@testing-library/react'
import sinon from 'sinon'

import Image from './Image'

const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'

describe('Image', function () {
  class ValidImage {
    constructor() {
      this.naturalHeight = 200
      this.naturalWidth = 400
      const fakeLoadEvent = {
        ...new Event('load'),
        target: this
      }
      setTimeout(() => this.onload(fakeLoadEvent), 0)
    }
  }

  before(function () {
    sinon.replace(window, 'Image', ValidImage)
  })

  after(function () {
    sinon.restore()
  })

  it('should render without crashing', async function () {
    render(<Image alt='a test image' src={src} />)
    const image = await screen.findByRole('img', { name: 'a test image' })
    expect(image).toBeTruthy()
  })

  it('should use alt text to describe the image', async function () {
    const alt = 'A galaxy'
    render(<Image alt={alt} src={src} />)
    const image = await screen.findByRole('img', { name: alt })
    expect(image).toBeTruthy()
  })

  it('should have a `<noscript />` image for SSR', function () {
    render(<Image src={src} />)
    const noscriptWrapper = document.querySelector('noscript')
    expect(noscriptWrapper).toBeDefined()
  })

  describe('height and width', function () {
    it('should be set if specified', async function () {
      render(<Image alt='a test image' height={200} width={270} src={src} />)
      const image = await screen.findByRole('img', { name: 'a test image' })
      const imageWrapper = screen.getByTestId('subject-thumbnail')
      const { maxHeight, maxWidth } = window.getComputedStyle(imageWrapper)
      expect(maxHeight).to.equal('200px')
      expect(maxWidth).to.equal('270px')
    })

    it('should fill the image container by default', async function () {
      render(<Image alt='a test image' src={src} />)
      const image = await screen.findByRole('img', { name: 'a test image' })
      const imageWrapper = screen.getByTestId('subject-thumbnail')
      const { maxHeight, maxWidth } = window.getComputedStyle(imageWrapper)
      expect(maxHeight).to.equal('')
      expect(maxWidth).to.equal('100%')
    })
  })
})
