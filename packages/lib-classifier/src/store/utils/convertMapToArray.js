// TODO: Add option to return array of pairs
export default function (map, options = { pairs: false }) {
  const values = map.values()

  return Array.from(values)
}