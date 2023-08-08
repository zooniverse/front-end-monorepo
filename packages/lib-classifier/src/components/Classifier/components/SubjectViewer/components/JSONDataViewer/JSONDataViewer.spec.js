import { expect } from 'chai'
import { render, screen, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { DataSeries, TESSLightCurve, VariableStar } from './JSONDataViewer.stories'
import projectAnnotations from '../../../../../../../.storybook/preview'

describe('Component > JSONDataViewer', function () {
  describe('with a data series plot', function () {
    it('should render a scatter plot viewer', async function () {
      const DataSeriesStory = composeStory(DataSeries, Meta, projectAnnotations)
      render(<DataSeriesStory />)
      await waitFor(() => expect(document.querySelector('.DataSeriesPlot')).to.exist())
    })
  })

  describe('with a TESS light curve', function () {
    it('should render a light curve viewer', async function () {
      const TESSLightCurveStory = composeStory(TESSLightCurve, Meta, projectAnnotations)
      render(<TESSLightCurveStory />)
      await waitFor(() => expect(document.querySelector('.TESSLightCurve')).to.exist())
    })
  })

  describe('with variable star data', function () {
    it('should render a variable star viewer', async function () {
      const VariableStarStory = composeStory(VariableStar, Meta, projectAnnotations)
      render(<VariableStarStory />)
      await waitFor(() => expect(document.querySelector('.VariableStarPlots')).to.exist())
    })
  })
})