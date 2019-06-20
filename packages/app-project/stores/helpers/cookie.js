// Borrowed from https://stackoverflow.com/a/25490531/5372931
export function getCookie (name) {
  // process.browser doesn't exist in the jsdom test environment
  if (process.browser || process.env.BABEL_ENV === 'test') {
    const value = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
    if (value) {
      console.log(`Retrieving ${value.pop().trim()} from cookie`)
    }
    return value ? value.pop().trim() : ''
  }

  return ''
}