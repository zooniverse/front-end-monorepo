import { Media } from '@zooniverse/react-components'
import { Box } from 'grommet'

function AncillaryData({ media }) {
  return (
    <Box gap='small' pad={{ vertical: 'small' }}>
      {media?.map((item) => (
        <Media
          key={item.id}
          alt={item.metadata?.filename || `Ancillary media ${item.id}`}
          fit='contain'
          height={500}
          src={item.src}
        />
      ))}
    </Box>
  )
}

export default AncillaryData
