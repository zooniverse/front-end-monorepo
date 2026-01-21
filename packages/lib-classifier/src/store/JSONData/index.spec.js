import { getType } from 'mobx-state-tree'

import JSONData from './'

describe('Models > JSONData', function () {
  async function superWaspSubject() {
    const response = await fetch('https://panoptes-uploads.zooniverse.org/subject_location/f311cd2a-f6c7-4cc2-a411-0e32c5ff55e3.json')
    return await response.json()
  }

  async function tessSubject() {
    const response = await fetch('https://panoptes-uploads.zooniverse.org/subject_location/a67ffd6c-36bc-4939-ad32-3706f606825b.txt')
    return await response.json()
  }

  async function variableStarSubject() {
    const response = await fetch('https://panoptes-uploads.zooniverse.org/subject_location/d6b3a990-b284-456e-ab23-1e497d660779.json')
    return await response.json()
  }

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

  it('should load TESS data', async function () {
    const tessSnapshot = await tessSubject()
    const tessData = JSONData.create(tessSnapshot)
    const dataType = getType(tessData).name
    expect(dataType).to.equal('TESSLightCurve')
  })

  it('should load series data', async function () {
    const dataSeriesSnapshot = await superWaspSubject()
    const seriesData = JSONData.create(dataSeriesSnapshot)
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

  it('should load variable star data', async function () {
    const variableStarSnapshot = await variableStarSubject()
    const variableStarData = JSONData.create(variableStarSnapshot)
    const dataType = getType(variableStarData).name
    expect(dataType).to.equal('VariableStarPlots')
  })
})
