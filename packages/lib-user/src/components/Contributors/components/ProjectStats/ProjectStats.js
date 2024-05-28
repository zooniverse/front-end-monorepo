import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { string, number } from 'prop-types'

function ProjectStats({
  classifications = 0,
  hours = 0,
  projectDisplayName = ''
}) {
  return (
    <Box
      align='center'
    >
      <SpacedText
        weight='bold'
        margin={{ bottom: 'xsmall' }}
      >
        {projectDisplayName}
      </SpacedText>
      <SpacedText
        uppercase={false}
      >
        {`${classifications.toLocaleString()} Classifications`}
      </SpacedText>
      <SpacedText
        uppercase={false}
      >
        {`${Math.round(hours).toLocaleString()} Hours`}
      </SpacedText>
    </Box>
  )
}

ProjectStats.propTypes = {
  projectDisplayName: string,
  classifications: number,
  hours: number
}

export default ProjectStats
