import CertificateContainer from './CertificateContainer'

export const metadata = {
  title: 'Certificate',
  description: 'My Zooniverse certificate page'
}

export default function Certificate({ params, searchParams }) {
  return (
    <CertificateContainer
      endDate={searchParams.end_date}
      login={params.login}
      projectId={searchParams.project_id}
      startDate={searchParams.start_date}
    />
  )
}
