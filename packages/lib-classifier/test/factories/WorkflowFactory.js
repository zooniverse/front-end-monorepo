import { Factory } from 'rosie'
import SubjectSetFactory from './SubjectSetFactory'

const subjectSets = Factory.buildList('subject_set', 5)
const subjectSetMap = {}
subjectSets.forEach(subjectSet => {
  subjectSetMap[subjectSet.id] = subjectSet
})

export default Factory.define('workflow')
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('active', true)
  .attr('configuration', {})
  .attr('first_task', '')
  .attr('grouped', false)
  .attr('links', {
    subject_sets: Object.keys(subjectSetMap)
  })
  .attr('tasks', {})
  .attr('steps', [])
  .attr('subjectSets', {
    resources: subjectSetMap
  })
  .attr('version', '1.0')
