import { Text } from 'grommet'
import { number, string } from 'prop-types'
import React from 'react'

import AnimatedNumber from './components/AnimatedNumber'

function Stat ({ label, value }) {
  return (
    <div>
      <Text color='#E2E5E9' tag='div' size='xxlarge'>
        <AnimatedNumber value={value} />
      </Text>
      <Text color='#A6A7A9' size='small' tag='div' weight='bold'>
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
