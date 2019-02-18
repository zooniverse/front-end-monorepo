import { Text } from 'grommet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AnimatedNumber from './components/AnimatedNumber'

function Stat ({ label, value }) {
  return (
    <div>
      <Text size='xxlarge' color='#E2E5E9' tag='div'>
        <AnimatedNumber value={value} />
      </Text>
      <Text size='small' color='#A6A7A9' weight='bold' tag='div'>
        {label}
      </Text>
    </div>
  )
}

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default Stat
