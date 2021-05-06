export default function searchParams(data) {
  let query = ''
  Object.entries(data).forEach(([key, value]) => {
    if (value !== '') {
      query += `@${key}:${value}*`
    }
  })
  const urlParams = (query !== '') ? `filter_field=${query}` : ''
  return urlParams
}
