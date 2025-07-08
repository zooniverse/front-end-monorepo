import { SubjectGroupModal } from './SubjectGroupModal'
import { SubjectMock } from './SubjectMock'

export default {
  title: 'Components / SubjectGroupModal',
  component: SubjectGroupModal
}

export function Default() {
  return (
    <SubjectGroupModal {...SubjectMock} />
  )
}
