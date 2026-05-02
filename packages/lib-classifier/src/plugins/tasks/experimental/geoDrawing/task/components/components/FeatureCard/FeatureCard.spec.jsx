import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import Meta, { Default, InFeet } from './FeatureCard.stories'

describe('FeatureCard', function () {
  describe('when it renders', function () {
    beforeEach(function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
    })

    it('should show the selected feature heading', function () {
      expect(screen.getByText('Selected feature:')).to.exist
    })

    it('should show latitude', function () {
      expect(screen.getByText('Latitude: 51.51°')).to.exist
    })

    it('should show longitude', function () {
      expect(screen.getByText('Longitude: -0.12°')).to.exist
    })

    it('should show the uncertainty radius in meters', function () {
      expect(screen.getByText('Uncertainty radius: 5,000m')).to.exist
    })
  })

  describe('with unit set to feet', function () {
    beforeEach(function () {
      const InFeetStory = composeStory(InFeet, Meta)
      render(<InFeetStory />)
    })

    it('should show the uncertainty radius converted to feet', function () {
      expect(screen.getByText('Uncertainty radius: 16,404.2ft')).to.exist
    })
  })
})
