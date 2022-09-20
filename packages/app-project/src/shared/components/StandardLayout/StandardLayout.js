import { bool, node } from 'prop-types'
import { Box } from 'grommet'
import { ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'

import { useAdminMode } from '@hooks'
import {
  AdminContainer,
  Announcements,
  ProjectHeader,
  ZooHeaderWrapper
} from '@components'

function StandardLayout ({
  children,
  inBeta,
}) {
  const { adminMode, toggleAdmin } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale

  return (
    <Box border={(inBeta) ? { color: 'brand', size: 'medium' } : false}>
      <ZooHeaderWrapper />
      <ProjectHeader adminMode={adminMode} />
      <Announcements />
      {children}
      <ZooFooter
        adminContainer={<AdminContainer onChange={toggleAdmin} checked={adminMode} />}
        locale={locale}
      />
    </Box>
  )
}

StandardLayout.propTypes = {
  children: node,
  inBeta: bool
}

export default StandardLayout
