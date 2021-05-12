export default function searchParams(data) {
  let query = []
  Object.entries(data).forEach(([key, value]) => {
    if (value !== '') {
      query.push(`${key}__contains=${encodeURIComponent(value)}`)
    }
  })
  const urlParams = query.join('&')
  return urlParams
}
