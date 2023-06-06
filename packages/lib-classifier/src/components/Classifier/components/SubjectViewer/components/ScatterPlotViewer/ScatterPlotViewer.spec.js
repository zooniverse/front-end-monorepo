import { composeStory } from '@storybook/react'
import { render } from '@testing-library/react'

import Meta, { Default, ErrorBars, KeplerLightCurve } from './ScatterPlotViewer.stories.js'
import projectAnnotations from '../../../../../../../.storybook/preview'

describe('Component > ScatterPlotViewer', function () {
  describe('default plot', function () {
    let chart

    beforeEach(function () {
      const MockScatterPlotViewer = composeStory(Default, Meta, projectAnnotations)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).to.exist()
    })

    it('should render the chart background', function () {
      const backgrounds = chart.querySelectorAll('.chartBackground')
      expect(backgrounds).to.have.lengthOf(2)
    })

    it('should render chart content', function () {
      expect(chart.querySelectorAll('g.chartContent')).to.have.lengthOf(1)
    })

    it('should render chart axes', function () {
      expect(chart.querySelectorAll('g.chartAxes')).to.have.lengthOf(1)
    })
  })

  describe('with error bars', function () {
    let chart

    beforeEach(function () {
      const MockScatterPlotViewer = composeStory(ErrorBars, Meta, projectAnnotations)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).to.exist()
    })

    it('should render the chart background', function () {
      const backgrounds = chart.querySelectorAll('.chartBackground')
      expect(backgrounds).to.have.lengthOf(2)
    })

    it('should render chart content', function () {
      expect(chart.querySelectorAll('g.chartContent')).to.have.lengthOf(1)
    })

    it('should render chart axes', function () {
      expect(chart.querySelectorAll('g.chartAxes')).to.have.lengthOf(1)
    })
  })

  describe('with custom chart options', function () {
    let chart

    beforeEach(function () {
      const MockScatterPlotViewer = composeStory(KeplerLightCurve, Meta, projectAnnotations)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).to.exist()
    })

    it('should render the chart background', function () {
      const backgrounds = chart.querySelectorAll('.chartBackground')
      expect(backgrounds).to.have.lengthOf(1)
    })

    it('should render chart content', function () {
      expect(chart.querySelectorAll('g.chartContent')).to.have.lengthOf(1)
    })

    it('should render chart axes', function () {
      expect(chart.querySelectorAll('g.chartAxes')).to.have.lengthOf(1)
    })
  })
})
