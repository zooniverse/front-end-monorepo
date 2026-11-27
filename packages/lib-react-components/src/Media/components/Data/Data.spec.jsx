import { render, screen } from '@testing-library/react'

import { useJSONData } from '../../../hooks'
import Data from './Data'

vi.mock('../../../hooks', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useJSONData: vi.fn() }
})

const featureCollection = {
  type: 'FeatureCollection',
  features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [-91.5, 47.5] }, properties: {} }]
}

function mockData(data, type = null) {
  useJSONData.mockReturnValue({ data, type, loading: false, error: null })
}

describe('Media > Data', function () {
  it('should show a mapping icon for a GeoJSON subject', function () {
    mockData(featureCollection, 'GeoJSON')
    render(<Data alt='Subject 1' src='https://example.org/subject.json' />)
    expect(screen.getByRole('img', { name: 'Subject 1' })).toBeTruthy()
    expect(document.querySelector('pre')).toBeNull()
  })

  it('should show a mapping icon for GeoJSON that fails type validation', function () {
    mockData({ type: 'FeatureCollection', features: [{ type: 'Feature', geometry: null, properties: {} }] })
    render(<Data alt='Subject 1' src='https://example.org/subject.json' />)
    expect(screen.getByRole('img', { name: 'Subject 1' })).toBeTruthy()
    expect(document.querySelector('pre')).toBeNull()
  })

  it('should show a mapping icon for a single GeoJSON Feature', function () {
    mockData({ type: 'Feature', geometry: { type: 'Point', coordinates: [-91.5, 47.5] }, properties: {} })
    render(<Data alt='Subject 1' src='https://example.org/subject.json' />)
    expect(screen.getByRole('img', { name: 'Subject 1' })).toBeTruthy()
  })

  it('should show other JSON as text', function () {
    mockData({ type: 'Feature story', hello: 'world' })
    render(<Data alt='Subject 1' src='https://example.org/subject.json' />)
    expect(document.querySelector('pre')).toBeTruthy()
    expect(screen.queryByRole('img')).toBeNull()
  })
})
