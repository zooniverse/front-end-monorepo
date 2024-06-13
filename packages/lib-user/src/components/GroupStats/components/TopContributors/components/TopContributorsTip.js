import {
  Button,
  Text,
  Tip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'

function TopContributorsTip() {
  return (
    <Tip
      content={
        <Text>
          Includes active and inactive members.
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
        margin={{ left: 'xsmall' }}
        plain
      />
    </Tip>
  )
}

export default TopContributorsTip
