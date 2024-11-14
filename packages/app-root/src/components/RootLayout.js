import PageContextProviders from './PageContextProviders.js'
import PageHeader from './PageHeader.js'
import PageFooter from './PageFooter.js'

export default function RootLayout({ children }) {
  return (
    <body>
      <PageContextProviders>
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
        <PageHeader />
        {children}
        <PageFooter />
      </PageContextProviders>
    </body>
  )
}
