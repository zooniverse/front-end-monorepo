import sinon from 'sinon'
import TileState from 'ol/TileState'
import { TILE_LOAD_TIMEOUT_MS } from './constants'
import loadTileWithTimeout from './loadTileWithTimeout'

function fakeTile () {
  const image = document.createElement('img')
  let state = TileState.LOADING
  return {
    image,
    getImage: () => image,
    getState: () => state,
    setState: sinon.spy(next => { state = next })
  }
}

describe('helpers > loadTileWithTimeout', function () {
  let clock

  beforeEach(function () {
    clock = sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  })

  afterEach(function () {
    clock.restore()
  })

  it('requests the tile image', function () {
    const tile = fakeTile()
    loadTileWithTimeout(tile, 'https://example.org/wms?tile=1')
    expect(tile.image.src).to.equal('https://example.org/wms?tile=1')
  })

  it('fails a tile that is still loading after the timeout', function () {
    const tile = fakeTile()
    loadTileWithTimeout(tile, 'https://example.org/wms?tile=1')
    clock.tick(TILE_LOAD_TIMEOUT_MS - 1)
    expect(tile.setState).to.not.have.been.called
    clock.tick(1)
    expect(tile.setState).to.have.been.calledOnceWith(TileState.ERROR)
  })

  it('cancels the request of a timed out tile', function () {
    const tile = fakeTile()
    loadTileWithTimeout(tile, 'https://example.org/wms?tile=1')
    clock.tick(TILE_LOAD_TIMEOUT_MS)
    expect(tile.image.getAttribute('src')).to.equal('')
  })

  it('leaves a tile that loaded in time alone', function () {
    const tile = fakeTile()
    loadTileWithTimeout(tile, 'https://example.org/wms?tile=1')
    tile.image.dispatchEvent(new Event('load'))
    clock.tick(TILE_LOAD_TIMEOUT_MS)
    expect(tile.setState).to.not.have.been.called
  })

  it('leaves a tile that already failed alone', function () {
    const tile = fakeTile()
    loadTileWithTimeout(tile, 'https://example.org/wms?tile=1')
    tile.image.dispatchEvent(new Event('error'))
    clock.tick(TILE_LOAD_TIMEOUT_MS)
    expect(tile.setState).to.not.have.been.called
  })
})
