import SubjectGroupModal from './SubjectGroupModal.jsx'
import { SubjectMock } from './SubjectMock'

export default {
  title: 'Tasks / SubjectGroupModal',
  component: SubjectGroupModal
}

export function Default() {
  return (
    <SubjectGroupModal {...SubjectMock} />
  )
}
