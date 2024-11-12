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
import PageHeader from '../../../components/PageHeader/PageHeader.js'

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
      <ProjectHeader adminMode={adminMode} />
      <Announcements />
    </header>
  )
}

function StandardLayout({ children, page = '' }) {
  const { inBeta } = useStores()
  const { adminMode, toggleAdmin } = useAdminMode()
  const router = useRouter()
  const locale = router?.locale

  const adminBorder = { size: 'medium' }
  const betaBorder = { color: 'brand', size: 'medium' }
  let border = adminMode ? adminBorder : false
  border = inBeta ? betaBorder : border
  const className = adminMode ? 'admin' : undefined

  return (
    <PageBox className={className} data-testid='project-page' border={border}>
      <details
        style={{
          padding: '5px clamp(20px, 3vw, 30px)',
          fontSize: '1rem',
          lineHeight: 1.2,
          color: '#000',
          background: '#f0b200'
        }}
      >
        <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
          Platform downtime scheduled on Wednesday November 20.
        </summary>
        <p style={{ paddingInline: '15px' }}>
          The Zooniverse platform will be offline for scheduled maintenance on
          Wednesday, November 20 from 4pm-10pm US Central Standard Time
          (2024-11-20 22:00 UTC to 2024-11-21 4:00 UTC). During this period, all
          projects and platform services will be inaccessible. We apologize for
          the inconvenience; this maintenance is necessary to make updates to
          platform infrastructure and improve long-term reliability and uptime.
          Please visit{' '}
          <a
            href='https://status.zooniverse.org/incident/1019747'
            target='_blank'
            style={{ color: '#000' }}
          >
            status.zooniverse.org
          </a>{' '}
          for updates before and during the downtime period. For any additional
          questions, please email{' '}
          <a
            style={{ color: '#000' }}
            href='mailto:contact@zooniverse.org'
          >
            contact@zooniverse.org
          </a>
          .
        </p>
      </details>
      {page !== 'home' && <HeaderComponents adminMode={adminMode} />}
      {children}
      <ZooFooter
        adminContainer={<AdminContainer onChange={toggleAdmin} checked={adminMode} />}
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
