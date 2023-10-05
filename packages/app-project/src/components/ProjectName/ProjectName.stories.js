import { Provider } from 'mobx-react'
import { ProjectName as ProjectNameComponent } from './ProjectName'
import { ProjectNameMock } from './ProjectName.mock'

export default {
  title: 'Project App / Shared / Project Name',
  component: ProjectNameComponent
}

export const ProjectName = () => (
  <ProjectNameComponent {...ProjectNameMock} />
)
