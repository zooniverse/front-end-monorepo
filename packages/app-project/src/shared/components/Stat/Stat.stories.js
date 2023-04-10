import Stat from './Stat'

export default {
  title: 'Project App / Shared / Stat',
  component: Stat
}

export const Default = () => <Stat label='Volunteers' value={122} />

export const HugeNumber = () => (
  <Stat label='Volunteers is a long word' value={122000000} />
)

export const Zero = () => <Stat label='Zero' value={0} />
