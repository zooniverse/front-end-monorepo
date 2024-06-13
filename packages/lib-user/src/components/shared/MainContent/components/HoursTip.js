import {
  Button,
  Text,
  Tip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'

function HoursTip() {
  return (
    <Tip
      content={
        <Text>
          Hours are calculated based on the start and end times of your classification efforts. Hours do not reflect your time spent on Talk.
        </Text>
      }
      dropProps={{
        align: { top: 'bottom' },
        background: 'dark-4',
        round: '5px',
        pad: '5px'
      }}
      plain
    >
      <Button
        icon={<CircleInformation size='0.75rem' />}
        margin={{
          bottom: 'small',
          right: 'auto'
        }}
        plain
      />
    </Tip>
  )
}

export default HoursTip
