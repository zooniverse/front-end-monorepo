import { panoptes } from '@zooniverse/panoptes-js'
import find from 'lodash/find'
import toNumber from 'lodash/toNumber'

function fetchWorkflowData(activeWorkflows) {
  return panoptes
    .get('/workflows', {
      id: activeWorkflows.join(','),
    })
    .then(response => response.body.workflows)
}

function fetchTranslationData(language, activeWorkflows) {
  return panoptes
    .get('/translations', {
      language,
      translated_id: activeWorkflows.join(','),
      translated_type: 'workflow'
    })
    .then(response => response.body.translations)
}

async function fetchWorkflowsHelper(language = 'en', activeWorkflows, defaultWorkflow) {
  try {
    const [workflows, translations] = await Promise.all([
      fetchWorkflowData(activeWorkflows),
      fetchTranslationData(language, activeWorkflows)
    ])

    return workflows.map(workflow => {
      const translation = find(translations, {
        translated_id: toNumber(workflow.id)
      })

      const isDefault = workflows.length === 1 || workflow.id === defaultWorkflow

      return {
        completeness: workflow.completeness || 0,
        default: isDefault,
        id: workflow.id,
        displayName: translation.strings.display_name
      }
    })
  } catch (error) {
    console.error(error)
    return error
  }
}

export default fetchWorkflowsHelper
