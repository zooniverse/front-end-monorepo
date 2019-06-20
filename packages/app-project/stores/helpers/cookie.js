import { compact } from 'lodash'

// Borrowed from https://stackoverflow.com/a/25490531/5372931
export function getCookie (name) {
  // process.browser doesn't exist in the jsdom test environment
  if (process.browser || process.env.BABEL_ENV === 'test') {
    const match = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')

    const compactMatchArray = compact(match)
    const value = compactMatchArray.pop()
    if (value) {
      console.log(`Retrieving ${value} from cookie`, typeof value)
    }

    return value ? value.trim() : ''
  }

  return ''
}