/* per PFE lab subject set upload docs:

Headers that begin with "#" or "//" denote private fields that will not be visible to classifiers in the main classification interface or in the Talk discussion tool.

Headers that begin with "!" denote fields that will not be visible to classifiers in the main classification interface but will be visible after classification in the Talk discussion tool. */

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

// note Classifier filterByLabel includes '!' in filters
export const filters = ['#']
