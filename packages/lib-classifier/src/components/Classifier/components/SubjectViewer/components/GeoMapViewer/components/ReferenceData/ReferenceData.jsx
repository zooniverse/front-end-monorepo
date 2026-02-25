import { SpacedText } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { shape, string } from 'prop-types'

function ReferenceData({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return null
  }

  return (
    <Box
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      margin={{ bottom: 'medium' }}
      flex={false}
    >
      <SpacedText
        weight='bold'
        margin={{ bottom: 'xsmall' }}
      >
        Reference Data
      </SpacedText>
      <Box gap='xsmall'>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key}>
            <Text weight='bold'>{key}:</Text> {value}
          </Text>
        ))}
      </Box>
    </Box>
  )
}

ReferenceData.propTypes = {
  data: shape({
    [string]: string
  })
}

export default ReferenceData
