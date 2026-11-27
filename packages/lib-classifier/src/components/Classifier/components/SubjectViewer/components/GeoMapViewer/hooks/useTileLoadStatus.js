import { useCallback, useEffect, useRef, useState } from 'react'
import TileState from 'ol/TileState'

import { TILE_STATUS_DELAY_MS } from '../helpers/constants'

const SETTLED = { loading: false, failed: false }

export default function useTileLoadStatus (baseLayer) {
  const [status, setStatus] = useState(SETTLED)
  const retryRef = useRef(() => {})

  useEffect(() => {
    setStatus(SETTLED)
    const source = baseLayer?.getSource?.()
    if (!source?.on) return undefined

    // OL sends no event for a tile abandoned mid-load, so pending tiles are checked, not counted.
    const pending = new Set()
    let failed = false
    let slow = false
    let timer = null

    function prune () {
      pending.forEach(tile => {
        if (tile.getState() !== TileState.LOADING) pending.delete(tile)
      })
    }

    function publish () {
      prune()
      if (pending.size === 0) slow = false
      setStatus({ loading: slow, failed })
    }

    function watch () {
      clearTimeout(timer)
      timer = setTimeout(function checkPendingTiles () {
        prune()
        slow = pending.size > 0
        publish()
        if (slow) watch()
      }, TILE_STATUS_DELAY_MS)
    }

    function handleStart (event) {
      pending.add(event.tile)
      if (!slow) watch()
    }

    function handleSettle (event) {
      pending.delete(event.tile)
      if (event.type === 'tileloaderror') failed = true
      publish()
    }

    source.on('tileloadstart', handleStart)
    source.on(['tileloadend', 'tileloaderror'], handleSettle)
    retryRef.current = function retry () {
      failed = false
      pending.clear()
      publish()
      source.refresh()
    }

    return () => {
      clearTimeout(timer)
      source.un('tileloadstart', handleStart)
      source.un(['tileloadend', 'tileloaderror'], handleSettle)
      retryRef.current = () => {}
    }
  }, [baseLayer])

  const retry = useCallback(() => retryRef.current(), [])

  return { ...status, retry }
}
