import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .option('activeWorkflowId', '12345')
  .option('workflowId', '67890')
  .attr('display_name', ['id'], (id) => { return `Project #${id}` })
  .attr('configuration', ['activeWorkflowId'], (activeWorkflowId) => {
    return { default_workflow: activeWorkflowId }
  })
  .attr('experimental_tools', [])
  .attr('links', ['activeWorkflowId', 'workflowId'], (activeWorkflowId, workflowId) => {
    return {
      active_workflows: [activeWorkflowId],
      workflows: [activeWorkflowId, workflowId]
    }
  })
  .attr('slug', 'zooniverse/example')
