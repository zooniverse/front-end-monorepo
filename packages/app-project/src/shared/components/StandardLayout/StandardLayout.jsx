import { node, string } from 'prop-types'
import { Box } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { ZooFooter } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import { useAdminMode } from '@hooks'
import { AdminContainer, Announcements, ProjectHeader } from '@components'
import PageHeader from '../../../components/PageHeader/PageHeader'

export const adminBorderImage =
  'repeating-linear-gradient(45deg,#000,#000 25px,#ff0 25px,#ff0 50px) 5'
const PageBox = styled(Box)`
  &.admin {
    border-image: ${adminBorderImage};
  }
`

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { inBeta } = store.project
  return {
    inBeta
  }
}

export function HeaderComponents({ adminMode }) {
  const { t } = useTranslation('components')

  return (
    <header aria-label={t('StandardLayout.headerLabel')}>
      <PageHeader adminMode={adminMode} />
      <ProjectHeader />
      <Announcements />
    </header>
  )
}

function StandardLayout({ children, page = '' }) {
  const { inBeta } = useStores()
  const { adminMode } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale

  const adminBorder = { size: 'medium' }
  const betaBorder = { color: 'brand', size: 'medium' }
  let border = adminMode ? adminBorder : false
  border = inBeta ? betaBorder : border
  const className = adminMode ? 'admin' : undefined

  return (
    <PageBox className={className} data-testid='project-page' border={border}>
      {page !== 'home' && <HeaderComponents adminMode={adminMode} />}
      {children}
      <ZooFooter
        adminContainer={<AdminContainer />}
        locale={locale}
      />
    </PageBox>
  )
}

StandardLayout.propTypes = {
  children: node,
  page: string
}

export default observer(StandardLayout)
