import { getType } from 'mobx-state-tree'

import { dataSeries, tessLightCurve, variableStar } from '@test/fixtures/jsonSubjectData'
import JSONData from './'

describe('Models > JSONData', function () {

  const barChartSnapshot = {
    data: [
      {
        label: 'apples',
        value: 23
      },
      {
        label: 'oranges',
        value: 25
      },
      {
        label: 'pears',
        value: 12
      }
    ],
    chartOptions: {
      xAxisLabel: 'X-Axis',
      yAxisLabel: 'Y-Axis'
    }
  }

  const geoJSONSnapshot = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [2.2944810, 48.8583701]
        },
        properties: {
          name: 'Eiffel Tower'
        }
      }
    ]
  }

  it('should load TESS data', function () {
    const tessData = JSONData.create(tessLightCurve)
    const dataType = getType(tessData).name
    expect(dataType).to.equal('TESSLightCurve')
  })

  it('should load series data', function () {
    const seriesData = JSONData.create(dataSeries)
    const dataType = getType(seriesData).name
    expect(dataType).to.equal('DataSeriesPlot')
  })

  it('should load bar chart data', function () {
    const barData = JSONData.create(barChartSnapshot)
    const dataType = getType(barData).name
    expect(dataType).to.equal('BarChart')
  })

  it('should load GeoJSON data', function () {
    const geoData = JSONData.create(geoJSONSnapshot)
    const dataType = getType(geoData).name
    expect(dataType).to.equal('GeoJSON')
  })

  it('should load variable star data', function () {
    const variableStarData = JSONData.create(variableStar)
    const dataType = getType(variableStarData).name
    expect(dataType).to.equal('VariableStarPlots')
  })
})
