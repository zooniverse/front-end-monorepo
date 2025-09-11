import { SpacedHeading } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { string } from 'prop-types'

function SectionHeading({
  icon,
  title
}) {
  return (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
    >
      {icon}
      <SpacedHeading
        color={{ dark: 'light-1', light: 'dark-4' }}
        level={3}
        size='16px'
      >
        {title}
      </SpacedHeading>
    </Box>
  )
}

SectionHeading.propTypes = {
  title: string
}

export default SectionHeading
