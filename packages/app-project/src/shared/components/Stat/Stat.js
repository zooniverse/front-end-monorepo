import { Text } from 'grommet'
import { number, string } from 'prop-types'

import AnimatedNumber from '@zooniverse/react-components/AnimatedNumber'

/*
  valueLoading is passed from components with useSWR to
  avoid rendering the value in AnimatedNumber while stats
  data is still loading
*/

function Stat({ className, label, value, valueLoading }) {
  return (
    <div className={className}>
      {valueLoading ? (
        <Box width='1rem' height='40px' background='neutral-1' />
      ) : (
        <Text
          as='div'
          color={{ light: 'dark-5', dark: 'light-1' }}
          size='xxlarge'
        >
          <AnimatedNumber value={value} />
        </Text>
      )}
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
