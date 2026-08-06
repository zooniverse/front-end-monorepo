import { types } from 'mobx-state-tree'

// Panoptes serves workflow config as strings (e.g. min_vertices: '3'); coerce to a finite number.
function coerceCount(snapshot, fallback) {
  if (snapshot === undefined || snapshot === null || snapshot === '') return fallback
  const n = Number(snapshot)
  return Number.isFinite(n) ? n : fallback
}

export default function countType(fallback) {
  const base = fallback === undefined
    ? types.maybe(types.number)
    : types.optional(types.number, fallback)
  return types.snapshotProcessor(base, {
    preProcessor(snapshot) {
      return coerceCount(snapshot, fallback)
    }
  })
}
