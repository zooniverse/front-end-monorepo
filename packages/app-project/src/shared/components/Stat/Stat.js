import { Text } from 'grommet'
import { number, string } from 'prop-types'

import AnimatedNumber from './components/AnimatedNumber'

function Stat ({ className, label, value }) {
  return (
    <div className={className}>
      <Text
        as='div'
        color={{ light: 'dark-5', dark: 'light-1' }}
        size='xxlarge'
      >
        <AnimatedNumber value={value} />
      </Text>
      <Text
        as='div'
        color={{ light: 'dark-5', dark: 'light-1' }}
        size='medium'
        weight='bold'
      >
        {label}
      </Text>
    </div>
  )
}

Stat.propTypes = {
  label: string.isRequired,
  value: number.isRequired
}

export default Stat
