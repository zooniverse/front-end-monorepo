export default function (map, options = { pairs: false }) {
  if (options.pairs) {
    return [...map] // return array of pairs, i.e. [['myKey', { foo: bar }]['nextKey', 'foobar']]
  }
  const values = map.values()

  return Array.from(values) // or just return an array of the map's values
}