import { generateExport } from './generateExport'

onmessage = function(event) {
  const { group, projects, stats, users } = event.data
  try {
    const { csvContent, filename } = generateExport({ group, projects, stats, users })
    postMessage({ csvContent, filename })
  } catch (error) {
    postMessage({ error: error.message })
  }
}
