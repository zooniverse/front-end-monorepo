import { validateDateRangeParams } from '../../../../../utils/validateDateRangeParams'
import { validateProjectIdParam } from '../../../../../utils/validateProjectIdParam'
import CertificateContainer from './CertificateContainer'

export const metadata = {
  title: 'Certificate',
  description: 'My Zooniverse certificate page'
}

export default async function Certificate(props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { dateRangeMessage, validEndDate, validStartDate } = validateDateRangeParams({
    endDate: searchParams.end_date,
    startDate: searchParams.start_date
  })

  const { projectId: validProjectId, message: projectIdMessage } = validateProjectIdParam(searchParams.project_id)

  const paramsValidationMessage = [dateRangeMessage, projectIdMessage]
    .filter(message => message)
    .join(', ')

  return (
    <CertificateContainer
      endDate={validEndDate}
      login={params.login}
      paramsValidationMessage={paramsValidationMessage}
      projectId={validProjectId}
      startDate={validStartDate}
    />
  )
}
