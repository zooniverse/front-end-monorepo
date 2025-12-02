import { validateDateRangeParams } from '../../../../utils/validateDateRangeParams'
import { validateProjectIdParam } from '../../../../utils/validateProjectIdParam'
import UserStatsContainer from './UserStatsContainer'

export const metadata = {
  title: 'User Stats',
  description: 'My Zooniverse user stats page'
}

export default async function UserStatsPage(props) {
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
    <UserStatsContainer
      endDate={validEndDate}
      login={params.login}
      paramsValidationMessage={paramsValidationMessage}
      projectId={validProjectId}
      startDate={validStartDate}
    />
  )
}
