import { Provider } from 'mobx-react'
import ConnectWithProjectComponent from './index'
import { ConnectWithProjectMock, ConnectWithProjectEmptyMock } from './ConnectWithProject.mock'

export default {
  title: 'Project App / Shared / ConnectWithProject',
  component: ConnectWithProjectComponent,
}

export const ConnectWithProject = () => (
  <Provider store={ConnectWithProjectMock}>
    <ConnectWithProjectComponent />
  </Provider>
)

export const ConnectWithProjectEmpty = () => (
  <Provider store={ConnectWithProjectEmptyMock}>
    <ConnectWithProjectComponent />
  </Provider>
)
