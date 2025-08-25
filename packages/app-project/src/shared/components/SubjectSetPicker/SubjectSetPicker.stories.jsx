import SubjectSetPicker from './SubjectSetPicker'
import { mockWorkflow, SubjectSetPickerBaseURL } from './SubjectSetPicker.mock'

export default {
  title: 'Project App / Shared / Subject Set Picker',
  component: SubjectSetPicker,
  args: {
    workflow: mockWorkflow
  }
}

export const Default = ({ workflow }) => (
  <SubjectSetPicker
    baseUrl={SubjectSetPickerBaseURL}
    workflow={workflow}
  />
)

export const Tablet = ({ workflow }) => (
  <SubjectSetPicker
    baseUrl={SubjectSetPickerBaseURL}
    workflow={workflow}
  />
)

Tablet.parameters = {
  viewport: {
    defaultViewport: 'ipad'
  }
}
