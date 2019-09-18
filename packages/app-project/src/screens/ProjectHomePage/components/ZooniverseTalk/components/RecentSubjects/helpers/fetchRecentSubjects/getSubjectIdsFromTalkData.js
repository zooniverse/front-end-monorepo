import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import slice from 'lodash/fp/slice'
import uniq from 'lodash/uniq'

function getSubjectIdsFromTalkData (comments) {
  return flow(
    map(comment => comment.focus_id),
    uniq,
    slice(0, 3)
  )(comments)
}

export default getSubjectIdsFromTalkData
