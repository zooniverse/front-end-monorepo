import { Provider } from 'mobx-react'
import ProjectNameComponent from './index'
import { ProjectNameMock } from './ProjectName.mock'

export default {
  title: 'Project App / Shared / Project Name',
  component: ProjectNameComponent
}

export const ProjectName = () => (
  <Provider store={ProjectNameMock}>
    <ProjectNameComponent />
  </Provider>
)
