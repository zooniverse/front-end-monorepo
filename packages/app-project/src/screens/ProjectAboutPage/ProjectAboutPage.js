import React from 'react'
import { ZooFooter } from '@zooniverse/react-components'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

function ProjectAboutPage ({
  // inBeta,
  // workflows
}) {
  return (
    <Box>
      <Media at='default'>
        <ZooHeaderWrapper />
        <ProjectHeader />
      </Media>

      <Media greaterThan='default'>
        <FullHeightBox margin={{ bottom: 'large' }}>
          <ZooHeaderWrapper />
          <ProjectHeader />
        </FullHeightBox>
        <Box
          align='start'
          direction='row'
          gap='small'
          margin='small'
          width={{ max: 'xxlarge' }}
        >
          <ThemeModeToggle />
        </Box>
      </Media>
      <ZooFooter />
    </Box>
  )
}

export default ProjectAboutPage
