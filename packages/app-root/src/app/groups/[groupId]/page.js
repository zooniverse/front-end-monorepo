import { validateDateRangeParams } from '../../../utils/validateDateRangeParams'
import { validateProjectIdParam } from '../../../utils/validateProjectIdParam'
import GroupStatsContainer from './GroupStatsContainer'

export const metadata = {
  title: 'Group Stats',
  description: 'Zooniverse group stats page'
}

export default async function GroupPage(props) {
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
    <GroupStatsContainer
      endDate={validEndDate}
      groupId={params.groupId}
      joinToken={searchParams.join_token}
      paramsValidationMessage={paramsValidationMessage}
      projectId={validProjectId}
      startDate={validStartDate}
    />
  )
}
