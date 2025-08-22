import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { Provider } from 'mobx-react'
import ProjectStatisticsComponent from './ProjectStatistics'
import {
  ProjectStatisticsContainerMock,
  ProjectStatisticsContainerRouterMock
} from './ProjectStatisticsContainer.mock'

export default {
  title: 'Project App / shared / Project Statistics',
  component: ProjectStatisticsComponent
}

export const ProjectStatistics = () => (
  <RouterContext.Provider value={ProjectStatisticsContainerRouterMock}>
    <Provider store={ProjectStatisticsContainerMock}>
      <ProjectStatisticsComponent />
    </Provider>
  </RouterContext.Provider>
)
