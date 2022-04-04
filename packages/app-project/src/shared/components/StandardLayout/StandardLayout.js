import { bool, node } from 'prop-types'
import { Box } from 'grommet'
import { ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'

import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'

function StandardLayout ({
  children,
  inBeta
}) {
  const { locale } = useRouter()
  return (
    <Box border={(inBeta) ? { color: 'brand', size: 'medium' } : false}>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      {children}
      <ZooFooter locale={locale} />
    </Box>
  )
}

StandardLayout.propTypes = {
  children: node,
  inBeta: bool
}

export default StandardLayout
