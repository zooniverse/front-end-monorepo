import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'

function TitledStat({
  title = '',
  value = 0 
}) {
  return (
    <Box
      align='center'
    >
      <SpacedText
        color={{ dark: 'neutral-6', light: 'neutral-7' }}
        uppercase={false}
      >
        {title}
      </SpacedText>
      <SpacedText
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        size='xlarge'
        weight='bold'
      >
        {value.toLocaleString()}
      </SpacedText>
    </Box>
  )
}

TitledStat.propTypes = {
  title: string.isRequired,
  value: number.isRequired
}

export default TitledStat
