export default function searchParams(data) {
  let query = []
  Object.entries(data).forEach(([key, value]) => {
    if (value !== '') {
      query.push(`${key}__contains=${value}`)
    }
  })
  const urlParams = (query !== '') ? query.join('&') : ''
  return urlParams
}
