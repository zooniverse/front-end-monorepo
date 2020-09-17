import { Factory } from 'rosie'
import SubjectSetFactory from './SubjectSetFactory'

const subjectSets = SubjectSetFactory.buildList('subject_sets', 10)
const subjectSetMap = {}
subjectSets.forEach(subjectSet => subjectSetMap[subjectSet.id] = subjectSet)

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
      subject_sets: subjectSets.map(subjectSet => subjectSet.id)
    }
  })
  .attr('tasks', {})
  .attr('steps', [])
  .attr('subjectSets', ['id'], function (id) {
    return {
      resources: subjectSetMap
    }
  })
  .attr('version', '1.0')
