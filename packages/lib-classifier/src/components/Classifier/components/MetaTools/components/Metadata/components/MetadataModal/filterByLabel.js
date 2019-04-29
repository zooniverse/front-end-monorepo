export default function filterByLabel (label, filters = []) {
  if (label) {
    const firstCharacter = label.trim().charAt(0)
    // Does anyone use // to hide metadata?
    // see https://github.com/zooniverse/Panoptes-Front-End/pull/1082#issuecomment-121662275
    if (!filters.includes(firstCharacter) && label.slice(0, 2) !== '//') {
      return label
    }

    return ''
  }

  return ''
}

export const filters = ['#', '!']
