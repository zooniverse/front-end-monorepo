import { Text } from 'grommet'
import { number, string } from 'prop-types'
import React from 'react'

import AnimatedNumber from './components/AnimatedNumber'

function Stat ({ className, label, value }) {
  return (
    <div className={className}>
      <Text color='light-3' tag='div' size='xxlarge'>
        <AnimatedNumber value={value} />
      </Text>
      <Text color='dark-5' size='small' tag='div' weight='bold'>
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
