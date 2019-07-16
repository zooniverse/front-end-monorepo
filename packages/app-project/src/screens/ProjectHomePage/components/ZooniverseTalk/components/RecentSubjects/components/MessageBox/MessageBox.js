import { Box } from 'grommet'
import React from 'react'

function MessageBox (props) {
  return (
    <Box
      align='center'
      animation={['fadeIn', 'slideUp']}
      background='light-1'
      border={{ color: 'light-3', side: 'all' }}
      elevation='small'
      fill
      justify='center'
      {...props}
    />
  )
}

export default MessageBox
