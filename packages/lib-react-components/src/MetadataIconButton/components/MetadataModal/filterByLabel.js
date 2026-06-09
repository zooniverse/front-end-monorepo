export const filters = ['#', '!']

export default function filterByLabel(label, activeFilters = filters) {
  if (label) {
    const firstCharacter = label.trim().charAt(0)

    if (!activeFilters.includes(firstCharacter) && label.slice(0, 2) !== '//') {
      return label
    }

    return ''
  }

  return ''
}
