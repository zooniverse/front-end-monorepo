import { Box } from 'grommet'
import React from 'react'

function MessageBox (props) {
  return (
    <Box
      align='center'
      animation={['fadeIn', 'slideUp']}
      background={{
        dark: 'dark-4',
        light: 'light-1'
      }}
      border={{
        color: {
          dark: 'transparent',
          light: 'light-3'
        },
        side: 'all'
      }}
      elevation='small'
      fill
      justify='center'
      {...props}
    />
  )
}

export default MessageBox
