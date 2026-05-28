import { types } from 'mobx-state-tree'

// Panoptes serves workflow config as strings (e.g. min_vertices: '3'); coerce to a finite number.
function coerceCount(snapshot, fallback) {
  if (snapshot === undefined || snapshot === null || snapshot === '') return fallback
  const n = typeof snapshot === 'number' ? snapshot : Number(snapshot)
  return Number.isFinite(n) ? n : fallback
}

const MinVertexCount = types.snapshotProcessor(
  types.optional(types.number, 2),
  {
    preProcessor(snapshot) {
      return coerceCount(snapshot, 2)
    }
  }
)

const MaxVertexCount = types.snapshotProcessor(
  types.maybe(types.number),
  {
    preProcessor(snapshot) {
      return coerceCount(snapshot, undefined)
    }
  }
)

const MinLineCount = types.snapshotProcessor(
  types.optional(types.number, 0),
  {
    preProcessor(snapshot) {
      return coerceCount(snapshot, 0)
    }
  }
)

const MaxLineCount = types.snapshotProcessor(
  types.maybe(types.number),
  {
    preProcessor(snapshot) {
      return coerceCount(snapshot, undefined)
    }
  }
)

const LineStringTool = types
  .model('LineStringTool', {
    color: types.optional(types.string, ''),
    label: types.optional(types.string, ''),
    max: MaxLineCount,
    max_vertices: MaxVertexCount,
    min: MinLineCount,
    min_vertices: MinVertexCount,
    type: types.literal('LineString')
  })

export default LineStringTool
