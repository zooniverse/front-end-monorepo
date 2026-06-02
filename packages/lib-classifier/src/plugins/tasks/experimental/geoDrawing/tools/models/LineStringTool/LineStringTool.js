import { types } from 'mobx-state-tree'

// Panoptes returns workflow config values as strings (e.g. min_vertices: '3').
// Coerce to a finite number; fall back to the supplied fallback (or undefined)
// when the snapshot is blank or non-numeric so OL Draw uses its own defaults.
function coerceVertexCount(snapshot, fallback) {
  if (snapshot === undefined || snapshot === null || snapshot === '') return fallback
  const n = typeof snapshot === 'number' ? snapshot : Number(snapshot)
  return Number.isFinite(n) ? n : fallback
}

const MinVertexCount = types.snapshotProcessor(
  types.optional(types.number, 2),
  {
    preProcessor(snapshot) {
      return coerceVertexCount(snapshot, 2)
    }
  }
)

const MaxVertexCount = types.snapshotProcessor(
  types.maybe(types.number),
  {
    preProcessor(snapshot) {
      return coerceVertexCount(snapshot, undefined)
    }
  }
)

const LineStringTool = types
  .model('LineStringTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    max_vertices: MaxVertexCount,
    min_vertices: MinVertexCount,
    type: types.literal('LineString')
  })

export default LineStringTool
