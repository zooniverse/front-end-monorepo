import { Text } from 'grommet'
import { number, string } from 'prop-types'
import React from 'react'

import AnimatedNumber from './components/AnimatedNumber'

function Stat ({ className, label, value }) {
  return (
    <div className={className}>
      <Text
        color={{ light: 'dark-5', dark: 'light-1' }}
        tag='div'
        size='xxlarge'
      >
        <AnimatedNumber value={value} />
      </Text>
      <Text
        color={{ light: 'dark-5', dark: 'light-1' }}
        size='medium'
        tag='div'
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
