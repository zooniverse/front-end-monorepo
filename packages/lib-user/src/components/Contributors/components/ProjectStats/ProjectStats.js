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
      a11yTitle={`${projectDisplayName} member stats`}
      align='center'
      as='li'
      border={{ color: 'light-5', side: 'vertical', size: '0.5px' }}
      data-testid='project-stats'
      pad='xxsmall'
      tabIndex={0}
      width={{ max: '200px', min: '200px' }}
    >
      <SpacedText
        margin={{ bottom: 'xsmall' }}
        textAlign='center'
        truncate={true}
        weight='bold'
      >
        {projectDisplayName}
      </SpacedText>
      <SpacedText
        textAlign='center'
        uppercase={false}
      >
        {`${classifications.toLocaleString()} Classifications`}
      </SpacedText>
      <SpacedText
        textAlign='center'
        uppercase={false}
      >
        {`${hours.toLocaleString()} Hours`}
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
