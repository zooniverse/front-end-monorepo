import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'

// TODO: find a more general representation!
import Rectangle from '@plugins/drawingTools/models/marks/Rectangle/'

const SubTaskPopup = types
  .model('SubjectViewer', {
    activeMark: types.maybe(types.safeReference(Rectangle)),
  })

  .actions(self => {
    function setActiveMark (val) {
      self.activeMark = val
    }
    
    return {
      setActiveMark,
    }
  })

export default SubTaskPopup
