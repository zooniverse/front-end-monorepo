import { composeStory } from '@storybook/react'
import { render, waitFor } from '@testing-library/react'
import Meta, {
  Default,
  ErrorBars,
  KeplerLightCurve,
  SelectionFeedback
} from './ScatterPlotViewer.stories'

describe('Component > ScatterPlotViewer', function () {
  describe('default plot', function () {
    let chart

    beforeEach(function () {
      const MockScatterPlotViewer = composeStory(Default, Meta)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).toBeDefined()
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
      const MockScatterPlotViewer = composeStory(ErrorBars, Meta)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).toBeDefined()
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
      const MockScatterPlotViewer = composeStory(KeplerLightCurve, Meta)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
      chart = document.querySelector('svg.scatterPlot')
    })

    it('should render without errors', function () {
      expect(chart).toBeDefined()
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

  describe('with data selection feedback', function () {
    beforeEach(async function () {
      const MockScatterPlotViewer = composeStory(SelectionFeedback, Meta)
      render(<MockScatterPlotViewer initialHeight={500} initialWidth={500} />)
    })

    it('should show successful matches', async function () {
      await waitFor(() => {
        const chart = document.querySelector('svg.scatterPlot')
        expect(
          chart.querySelectorAll('rect.selection[fill=green]')
        ).to.have.lengthOf(1)
      })
    })

    it('should show failed matches', async function () {
      await waitFor(() => {
        const chart = document.querySelector('svg.scatterPlot')
        expect(
          chart.querySelectorAll('rect.selection[fill=red]')
        ).to.have.lengthOf(1)
      })
    })

    it('should show volunteer selections', async function () {
      await waitFor(() => {
        const chart = document.querySelector('svg.scatterPlot')
        expect(
          chart.querySelectorAll('rect.selection[fill=transparent]')
        ).to.have.lengthOf(3)
      })
    })
  })
})
