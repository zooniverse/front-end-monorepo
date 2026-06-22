import { render, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { vi } from 'vitest'

import { dataSeries, tessLightCurve, variableStar } from '@test/fixtures/jsonSubjectData'
import Meta, { DataSeries, TESSLightCurve, VariableStar } from './JSONDataViewer.stories'

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useSubjectJSON: vi.fn() }
})

import { useSubjectJSON } from '@hooks'

function stubJSONData({ data, typeName }) {
  useSubjectJSON.mockReturnValue({
    loading: false,
    data,
    error: null,
    type: { name: typeName },
    viewer: { current: null }
  })
}

describe('Component > JSONDataViewer', function () {
  describe('with a data series plot', function () {
    it('should render a scatter plot viewer', async function () {
      stubJSONData({ data: dataSeries, typeName: 'DataSeriesPlot' })
      const DataSeriesStory = composeStory(DataSeries, Meta)
      render(<DataSeriesStory />)
      await waitFor(() => expect(document.querySelector('.DataSeriesPlot')).to.exist)
    })
  })

  describe('with a TESS light curve', function () {
    it('should render a light curve viewer', async function () {
      stubJSONData({ data: tessLightCurve, typeName: 'TESSLightCurve' })
      const TESSLightCurveStory = composeStory(TESSLightCurve, Meta)
      render(<TESSLightCurveStory />)
      await waitFor(() => expect(document.querySelector('.TESSLightCurve')).to.exist)
    })
  })

  describe('with variable star data', function () {
    it('should render a variable star viewer', async function () {
      stubJSONData({ data: variableStar, typeName: 'VariableStarPlots' })
      const VariableStarStory = composeStory(VariableStar, Meta)
      render(<VariableStarStory />)
      await waitFor(() => expect(document.querySelector('.VariableStarPlots')).to.exist)
    })
  })
})
