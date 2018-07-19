import { types } from 'mobx-state-tree'
import layouts from '../helpers/layouts'
import subjectViewers from '../helpers/subjectViewers'

const Classifier = types
  .model('Classifier', {
    layout: types.optional(types.enumeration('layout', layouts.values), layouts.default),
  })

  .actions(self => ({
    setLayout (layout = layouts.DefaultLayout) {
      self.layout = layout
    }
  }))

export default Classifier
