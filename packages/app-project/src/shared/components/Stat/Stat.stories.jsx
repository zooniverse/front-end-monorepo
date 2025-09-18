import StatComponent from './Stat'
import { DefaultMock, HugeNumberMock, ZeroMock } from './Stat.mock'

export default {
  title: 'Project App / Shared / Stat',
  component: StatComponent
}

export const Default = () => (
  <StatComponent {...DefaultMock} />
)

export const HugeNumber = () => (
  <StatComponent {...HugeNumberMock} />
)

export const Zero = () => (
  <StatComponent {...ZeroMock} />
)
