import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('activity_count', 100)
  .attr('activity_count_by_workflow', {})
  .attr('links', {})
  .attr('preferences', {
    minicourses: {},
    selected_workflow: '',
    tutorials_completed_at: {}
  })
  .attr('settings', {})
