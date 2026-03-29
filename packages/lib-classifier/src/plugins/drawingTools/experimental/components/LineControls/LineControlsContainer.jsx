import { tryReference } from 'mobx-state-tree'
import PropTypes from 'prop-types'

import LineControls from './LineControls'
import { withStores } from '@helpers'

function storeMapper(classifierStore) {
  const { activeInteractionTask } = classifierStore.workflowSteps
  const { deleteMark } = activeInteractionTask
  const activeMark = tryReference(() => activeInteractionTask.activeMark)
  
  return {
    mark: activeMark?.tool.type === 'freehandLine' ? activeMark : undefined,
    deleteMark
  }
}

export function LineControlsContainer({ deleteMark, mark }) {
  return (mark && (
    <LineControls
      mark={mark}
      onDelete={deleteMark}
    />
  ))
}

LineControlsContainer.propTypes = {
  deleteMark: PropTypes.func,
  mark: PropTypes.object
}

export default withStores(LineControlsContainer, storeMapper)