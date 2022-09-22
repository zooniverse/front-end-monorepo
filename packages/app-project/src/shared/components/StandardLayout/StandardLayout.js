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

export const adminBorderImage = 'repeating-linear-gradient(45deg, #000, #000 25px, #ff0 25px, #ff0 50px) 5'

function StandardLayout ({
  children,
  inBeta,
}) {
  const { adminMode, toggleAdmin } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale

  const adminBorder = { size: 'medium' }
  const betaBorder = { color: 'brand', size: 'medium' }
  const pageStyle = {}
  if (adminMode) {
    pageStyle.borderImage = adminBorderImage
  }
  let border = adminMode ? adminBorder : false
  border = inBeta ? betaBorder : border

  return (
    <Box data-testid='project-page' border={border} style={pageStyle}>
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
