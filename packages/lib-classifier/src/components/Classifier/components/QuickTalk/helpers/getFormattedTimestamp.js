export default function getFormattedTimestamp (timestamp = '') {
  try {
    const d = new Date(timestamp)
    return d.toLocaleString()
  } catch {
    return ''
  }
}
