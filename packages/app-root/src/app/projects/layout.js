'use client'

import { Box } from 'grommet'

import ContainerBox from '@/components/projects/ContainerBox'

function ProjectsPageLayout({ children }) {
  return (
    <main>
      <Box
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        align='center'
      >
        <ContainerBox
          align='center'
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          width='min(100%, 90rem)'
        >
          {children}
        </ContainerBox>
      </Box>
    </main>
  )
}

export default ProjectsPageLayout
