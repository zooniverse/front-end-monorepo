import TileState from 'ol/TileState'

import { TILE_LOAD_TIMEOUT_MS } from './constants'

function loadTileWithTimeout (tile, src) {
  const image = tile.getImage()

  const timer = setTimeout(function failSlowTile () {
    image.src = ''
    if (tile.getState() === TileState.LOADING) tile.setState(TileState.ERROR)
  }, TILE_LOAD_TIMEOUT_MS)

  function settle () {
    clearTimeout(timer)
  }
  image.addEventListener('load', settle, { once: true })
  image.addEventListener('error', settle, { once: true })

  image.src = src
}

export default loadTileWithTimeout
