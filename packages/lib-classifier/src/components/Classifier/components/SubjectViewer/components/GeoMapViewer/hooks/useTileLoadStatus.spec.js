import { act, renderHook } from '@testing-library/react'
import sinon from 'sinon'
import TileState from 'ol/TileState'
import TileLayer from 'ol/layer/Tile'
import { TileSourceEvent } from 'ol/source/Tile'
import TileWMS from 'ol/source/TileWMS'

import { TILE_STATUS_DELAY_MS } from '../helpers/constants'
import useTileLoadStatus from './useTileLoadStatus'

function wmsLayer () {
  return new TileLayer({ source: new TileWMS({ url: 'https://example.org/wms', params: { LAYERS: 'foo' } }) })
}

function fakeTile (state = TileState.LOADING) {
  return { state, getState () { return this.state } }
}

function emit (layer, type, tile) {
  act(() => {
    layer.getSource().dispatchEvent(new TileSourceEvent(type, tile))
  })
}

describe('GeoMapViewer > hooks > useTileLoadStatus', function () {
  let clock

  beforeEach(function () {
    clock = sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] })
  })

  afterEach(function () {
    clock.restore()
  })

  it('is idle with no base layer', function () {
    const { result } = renderHook(() => useTileLoadStatus(null))
    expect(result.current.loading).to.equal(false)
    expect(result.current.failed).to.equal(false)
  })

  it('does not report quick tiles as loading', function () {
    const layer = wmsLayer()
    const { result } = renderHook(() => useTileLoadStatus(layer))
    const tile = fakeTile()
    emit(layer, 'tileloadstart', tile)
    tile.state = TileState.LOADED
    emit(layer, 'tileloadend', tile)
    act(() => clock.tick(TILE_STATUS_DELAY_MS))
    expect(result.current.loading).to.equal(false)
  })

  it('reports loading once a tile has been pending past the delay', function () {
    const layer = wmsLayer()
    const { result } = renderHook(() => useTileLoadStatus(layer))
    emit(layer, 'tileloadstart', fakeTile())
    expect(result.current.loading).to.equal(false)
    act(() => clock.tick(TILE_STATUS_DELAY_MS))
    expect(result.current.loading).to.equal(true)
  })

  it('stops reporting loading when the last tile arrives', function () {
    const layer = wmsLayer()
    const { result } = renderHook(() => useTileLoadStatus(layer))
    const tile = fakeTile()
    emit(layer, 'tileloadstart', tile)
    act(() => clock.tick(TILE_STATUS_DELAY_MS))
    tile.state = TileState.LOADED
    emit(layer, 'tileloadend', tile)
    expect(result.current.loading).to.equal(false)
  })

  it('stops reporting loading for a tile that was abandoned without an event', function () {
    const layer = wmsLayer()
    const { result } = renderHook(() => useTileLoadStatus(layer))
    const tile = fakeTile()
    emit(layer, 'tileloadstart', tile)
    act(() => clock.tick(TILE_STATUS_DELAY_MS))
    expect(result.current.loading).to.equal(true)
    tile.state = TileState.ABORT
    act(() => clock.tick(TILE_STATUS_DELAY_MS))
    expect(result.current.loading).to.equal(false)
  })

  it('reports a failed tile', function () {
    const layer = wmsLayer()
    const { result } = renderHook(() => useTileLoadStatus(layer))
    const tile = fakeTile()
    emit(layer, 'tileloadstart', tile)
    tile.state = TileState.ERROR
    emit(layer, 'tileloaderror', tile)
    expect(result.current.failed).to.equal(true)
  })

  it('retry clears the failure and reloads the layer', function () {
    const layer = wmsLayer()
    const refresh = sinon.spy(layer.getSource(), 'refresh')
    const { result } = renderHook(() => useTileLoadStatus(layer))
    const tile = fakeTile()
    emit(layer, 'tileloadstart', tile)
    tile.state = TileState.ERROR
    emit(layer, 'tileloaderror', tile)
    act(() => result.current.retry())
    expect(result.current.failed).to.equal(false)
    expect(refresh).to.have.been.calledOnce
  })

  it('starts fresh when the base layer changes', function () {
    const first = wmsLayer()
    const { result, rerender } = renderHook(({ layer }) => useTileLoadStatus(layer), { initialProps: { layer: first } })
    const tile = fakeTile()
    emit(first, 'tileloadstart', tile)
    tile.state = TileState.ERROR
    emit(first, 'tileloaderror', tile)
    expect(result.current.failed).to.equal(true)
    rerender({ layer: wmsLayer() })
    expect(result.current.failed).to.equal(false)
    expect(result.current.loading).to.equal(false)
  })
})
