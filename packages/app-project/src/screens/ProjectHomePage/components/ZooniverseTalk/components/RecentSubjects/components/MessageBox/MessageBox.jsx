import { Box } from 'grommet'
import { string } from 'prop-types'

function MessageBox (props) {
  return (
    <Box
      as='p'
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
      pad='small'
      {...props}
    />
  )
}

MessageBox.propTypes = {
  children: string
}
export default MessageBox
