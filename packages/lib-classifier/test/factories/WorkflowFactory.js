import { Factory } from 'rosie'

export default Factory.define('workflow')
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('active', true)
  .attr('configuration', {})
  .attr('first_task', '')
  .attr('grouped', false)
  .attr('links', ['id'], function (id) {
    return {
      subject_sets: [`${id}1`, `${id}2`]
    }
  })
  .attr('tasks', {})
  .attr('steps', [])
  .attr('subjectSets', ['id'], function (id) {
    return {
      resources: {
        [`${id}1`]: {
          id: `${id}1`,
          display_name: 'A Subject Set',
          set_member_subjects_count: 6
        },
        [`${id}2`]: {
          id: `${id}2`,
          display_name: 'Another Subject Set',
          set_member_subjects_count: 9
        }
      }
    }
  })
  .attr('version', '1.0')
