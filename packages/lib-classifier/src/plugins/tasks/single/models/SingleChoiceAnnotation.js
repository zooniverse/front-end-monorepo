import { types } from 'mobx-state-tree'
import Annotation from '../../models/Annotation'

// Delilah: Where should this live for VV?
// Depends on MobX so if it should live in lib-subject-viewers we'll need to add MobX as a dependency there
// I can use this as the model that gets imported

const SingleChoice = types.model('SingleChoice', {
  taskType: types.literal('single'),
  value: types.maybeNull(types.number)
})
  .views(self => ({
    get isComplete () {
      return self.value !== null
    }
  }))

const SingleChoiceAnnotation = types.compose('SingleChoiceAnnotation', Annotation, SingleChoice)

export default SingleChoiceAnnotation
