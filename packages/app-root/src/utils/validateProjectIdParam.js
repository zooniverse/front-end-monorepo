export function validateProjectIdParam(projectId) {
  // if project ID is undefined, return undefined
  if (projectId === undefined) {
    return { projectId: undefined }
  }
  // project ID per search param should be a string
  if (typeof projectId !== 'string') {
    return {
      projectId: null,
      message: 'Invalid project_id, must be a string'
    }
  }
  // as of August, 2024, production project IDs are ~24000 (5 digits)
  // therefore, project IDs should be less than 6 digits
  if (projectId.length > 6) {
    return {
      projectId: null, 
      message: 'Invalid project_id, must be less than 6 digits'
    }
  }
  // project IDs are a string of numbers
  if (isNaN(projectId)) {
    return {
      projectId: null,
      message: 'Invalid project_id, must be a number'
    }
  }
  // return valid project ID
  return { projectId }
}
